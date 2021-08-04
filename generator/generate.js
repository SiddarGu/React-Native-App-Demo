const { generateTemplateFiles } = require('generate-template-files');

generateTemplateFiles([
  {
    option: 'Create Store',
    defaultCase: '(camelCase)',
    entry: {
      folderPath: './generator/template/store_template.js',
    },
    stringReplacers: [{ question: 'Insert Store Name', slot: '__name__' }],
    output: {
      path: './src/stores/__name__(camelCase).js',
      pathAndFileNameDefaultCase: '(camelCase)',
      overwrite: false,
    },
  },
  {
    option: 'Create Component',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './generator/template/component_template.js',
    },
    stringReplacers: [{ question: 'Insert Component Name', slot: '__name__' }],
    output: {
      path: './src/components/__name__(pascalCase).js',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false,
    },
  },
  {
    option: 'Create Stack Navigator',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './generator/template/navigator_template.js',
    },
    stringReplacers: [{ question: 'Insert Navigator Name', slot: '__name__' }],
    output: {
      path: './src/navigations/__name__(pascalCase).js',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false,
    },
  },
  {
    option: 'Create Screen',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './generator/template/screen_template.js',
    },
    stringReplacers: [{ question: 'Insert screen Name', slot: '__name__' }],
    output: {
      path: './src/screens/__name__(pascalCase).js',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false,
    },
    onComplete: () => {
      console.log('\x1b[31m', '!!!请把它放在对应的文件夹!!！', '\n');
    },
  },
]);
