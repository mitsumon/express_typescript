import inquirer from 'inquirer';
import path from 'path';
import { generateEntity, generateRepositoryInterface } from './templates/entitlyLayer';
import {
  generateUseCase,
  generateUseCaseInterface,
  generateRequestDto,
  generateResponseDto,
} from './templates/useCaseLayer';
import { generateController, generatePrismaRepository } from './templates/adapterLayer';
import { generateRouter } from './templates/infrastructureLayer';
import { writeFile, lowercaseFirst, capitalize } from './utils';

async function generateEntityLayer() {
  const { entityName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'entityName',
      message: 'エンティティの名前を入力してください:',
    },
  ]);

  const basePath = path.join(__dirname, '../src/domain');

  // エンティティの生成
  const entityContent = generateEntity(entityName);
  writeFile(
    path.join(basePath, 'entities', `${lowercaseFirst(entityName)}.ts`),
    entityContent
  );
  // リポジトリインターフェースの生成
  const repositoryInerfaceContent = generateRepositoryInterface(entityName);
  writeFile(
    path.join(
      basePath,
      'repositories',
      `${lowercaseFirst(entityName)}RepositoryInterface.ts`
    ),
    repositoryInerfaceContent
  );
}

async function generateUseCaseLayer() {
  const { entityName, useCaseName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'entityName',
      message: 'エンティティ名を入力してください:',
    },
    {
      type: 'input',
      name: 'useCaseName',
      message: 'ユースケース名を入力してください:',
    },
  ]);

  const basePath = path.join(__dirname, '../src/application');

  // UseCaseInterfaceの生成
  const useCaseInterfaceContent = generateUseCaseInterface(entityName, useCaseName);
  writeFile(
    path.join(
      basePath,
      'usecases',
      `${entityName}`,
      `${lowercaseFirst(useCaseName)}UseCaseInterface.ts`
    ),
    useCaseInterfaceContent
  );

  // UseCaseの生成
  const useCaseContent = generateUseCase(entityName, useCaseName);
  writeFile(
    path.join(
      basePath,
      'usecases',
      `${entityName}`,
      `${lowercaseFirst(useCaseName)}UseCase.ts`
    ),
    useCaseContent
  );

  // RequestDtoの生成
  const requestDtoContent = generateRequestDto(useCaseName);
  writeFile(
    path.join(
      basePath,
      'dtos',
      `${entityName}`,
      `${lowercaseFirst(useCaseName)}RequestDto.ts`
    ),
    requestDtoContent
  );

  // RequestDtoの生成
  const responseDtoContent = generateResponseDto(useCaseName);
  writeFile(
    path.join(
      basePath,
      'dtos',
      `${entityName}`,
      `${lowercaseFirst(useCaseName)}ResponseDto.ts`
    ),
    responseDtoContent
  );
}

async function generateInterfaceAdapterLayer() {
  const { entityName, useCaseName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'entityName',
      message: 'エンティティ名を入力してください:',
    },
    {
      type: 'input',
      name: 'useCaseName',
      message: 'ユースケース名を入力してください:',
    },
  ]);

  const basePath = path.join(__dirname, '../src/adapter');

  // Controllerの生成
  const controllerContent = generateController(entityName, useCaseName);
  writeFile(
    path.join(basePath, 'controllers', `${lowercaseFirst(entityName)}Controller.ts`),
    controllerContent
  );

  // Repositoryの生成
  const repositoryContent = generatePrismaRepository(entityName);
  writeFile(
    path.join(basePath, 'repositories', `prisma${capitalize(entityName)}Repository.ts`),
    repositoryContent
  );
}

async function generateInfrastructureLayer() {
  const { entityName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'entityName',
      message: 'エンティティの名前を入力してください:',
    },
  ]);

  const basePath = path.join(__dirname, '../src/infrastructure');

  const routerContent = generateRouter(entityName);
  writeFile(
    path.join(basePath, 'web', 'routers', `${lowercaseFirst(entityName)}Router.ts`),
    routerContent
  );
}

async function main() {
  const leyers = [
    'Entity',
    'UseCase',
    'Interface adapter',
    'Framework and driver',
  ] as const;

  type Layer = (typeof leyers)[number];

  const { layer }: { layer: Layer } = await inquirer.prompt([
    {
      type: 'list',
      name: 'layer',
      message: 'どの層のファイルを生成しますか？',
      choices: leyers,
    },
  ]);

  console.log(layer);
  if (layer === 'Entity') {
    await generateEntityLayer();
  } else if (layer === 'UseCase') {
    await generateUseCaseLayer();
  } else if (layer === 'Interface adapter') {
    await generateInterfaceAdapterLayer();
  } else if (layer === 'Framework and driver') {
    await generateInfrastructureLayer();
  } else {
    console.error('Invalid layer selected.');
    process.exit(1);
  }
}

main();
