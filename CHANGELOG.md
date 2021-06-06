# Changelog

## [1.4.0](https://www.github.com/lilboards/lilboards/compare/v1.3.0...v1.4.0) (2021-06-06)


### Features

* **components:** show Logout button in Header when user's signed in ([840c261](https://www.github.com/lilboards/lilboards/commit/840c261325d12abd2e968f93df775c4535d32a16))

## [1.3.0](https://www.github.com/lilboards/lilboards/compare/v1.2.0...v1.3.0) (2021-06-05)


### Features

* **components:** add Logout ([3e7c330](https://www.github.com/lilboards/lilboards/commit/3e7c330f9fffc6a69808e860f067288a809e80e2))
* **components:** render Login in Routes ([4a3412a](https://www.github.com/lilboards/lilboards/commit/4a3412acf855dcaf8200817832963a27e3675ed3))
* **slices:** add and use action `resetUser` ([eb8c951](https://www.github.com/lilboards/lilboards/commit/eb8c95172b9010f1d732793b571bcc2bd268d83c))
* **utils:** add `resetStore` test helper ([df22583](https://www.github.com/lilboards/lilboards/commit/df22583b30d9b8df0cc38c5ef9f3ff29d60b4db6))
* **utils:** add test helpers ([e75976a](https://www.github.com/lilboards/lilboards/commit/e75976ad0eeae739b3a2a594de3145960bcbe0f0))

## [1.2.0](https://www.github.com/lilboards/lilboards/compare/v1.1.0...v1.2.0) (2021-06-04)


### Features

* **components:** add NotFound ([0694958](https://www.github.com/lilboards/lilboards/commit/06949584d29b40ea5cf5a7a407f48e5b972afc37))
* **Routes:** render NotFound as default route ([fcc890c](https://www.github.com/lilboards/lilboards/commit/fcc890c8261255281fd3efbe6967aeafebcfd604))

## [1.1.0](https://www.github.com/lilboards/lilboards/compare/v1.0.1...v1.1.0) (2021-06-04)


### Features

* **hooks:** create useDispatch and useSelector ([1e8aab6](https://www.github.com/lilboards/lilboards/commit/1e8aab691e2ecbfcc35eb5713d1a7a118326302f))
* **Login:** increase size of heading ([e13aaa7](https://www.github.com/lilboards/lilboards/commit/e13aaa74638b3be67a8694d91c5c2a180e1ca6b6))
* render Provider in index ([2774f53](https://www.github.com/lilboards/lilboards/commit/2774f53e8ca207243305d45c6041c9f6b0274c17))
* **slices:** add userSlice ([e1277aa](https://www.github.com/lilboards/lilboards/commit/e1277aa8f7f4b7ed5ec9378711348cfdd80764f1))
* **store:** configure store ([eced73b](https://www.github.com/lilboards/lilboards/commit/eced73b42107b210f620258466fe6d696fd515e7))

### [1.0.1](https://www.github.com/lilboards/lilboards/compare/v1.0.0...v1.0.1) (2021-06-03)


### Bug Fixes

* **Login:** avoid redirect after sign-in ([9442cdc](https://www.github.com/lilboards/lilboards/commit/9442cdc36bfe9be70172ac44de10e63349e5bdf6))

## 1.0.0 (2021-06-03)


### Features

* add Login to Routes and update Header button link ([5ff0614](https://www.github.com/lilboards/lilboards/commit/5ff06147a5bf5c33d0c85a4b5bea199982763c8c))
* add Routes and render Home ([426d8f5](https://www.github.com/lilboards/lilboards/commit/426d8f5a68ef2f14edbad6aded58562309fe9a87))
* **boards:** add Boards ([bda4c9b](https://www.github.com/lilboards/lilboards/commit/bda4c9b12f815adc29ae3f2ba5af07712ac4c052))
* **common:** add Header with heading and button ([5568ca6](https://www.github.com/lilboards/lilboards/commit/5568ca608105fb1629a1c744da2a4ca7178391ee))
* **common:** style Header elements ([40af5b5](https://www.github.com/lilboards/lilboards/commit/40af5b52808b790dc7cb9327b3b91fb4f0d3830b))
* **config:** check env and host ([9e042c0](https://www.github.com/lilboards/lilboards/commit/9e042c0cec07236040e5bd929a0971a3de8f446a))
* delete boilerplate code from create-react-app ([79a367d](https://www.github.com/lilboards/lilboards/commit/79a367d57ed275da855ca1be80265db2c749ca47))
* **firebase:** export app, auth, and database ([7e5c72f](https://www.github.com/lilboards/lilboards/commit/7e5c72fcef4bb1e5ee4eaf5a45dc58c5374fc277))
* **firebase:** get reference to auth service ([b942870](https://www.github.com/lilboards/lilboards/commit/b942870e02845d9b74856120ed8182daed90979b))
* **firebase:** get reference to database service ([6bcdd53](https://www.github.com/lilboards/lilboards/commit/6bcdd534af2abb732a7daf80af60e320dd990666))
* **firebase:** initialize firebase app ([e7c87b2](https://www.github.com/lilboards/lilboards/commit/e7c87b2eb1816bc6487ec1a3dba106e821a3d994))
* **home:** move App to home ([ea9e27f](https://www.github.com/lilboards/lilboards/commit/ea9e27f5e7b736db5891168912de8b2510a29697))
* **home:** render Header in Home ([b7a7b10](https://www.github.com/lilboards/lilboards/commit/b7a7b10ebe2c114fb0de210c1aba8d8a2c547493))
* **home:** update copy ([75e8e73](https://www.github.com/lilboards/lilboards/commit/75e8e73d7794a27deece3902ec76f8dd3c4c2109))
* **index:** render material-ui CssBaseline ([9a3b632](https://www.github.com/lilboards/lilboards/commit/9a3b632c2e6cd641da462ecb1c11f56b20d8b4be))
* initialize project using Create React App ([508e705](https://www.github.com/lilboards/lilboards/commit/508e705f839996b9224e3b5953e48bd594177e60))
* **layout:** change heading to link in Header ([def06e8](https://www.github.com/lilboards/lilboards/commit/def06e800d2856cc749dfa94d53d98faa21da166))
* **layout:** double margin top and bottom in Layout ([48b2e6a](https://www.github.com/lilboards/lilboards/commit/48b2e6a5092cf7f161434ff8a397aa366a44a5cb))
* **login:** sign in with react-firebaseui ([6a1b34d](https://www.github.com/lilboards/lilboards/commit/6a1b34dece1cfc4607ff07b136d7b2ff80426c71))
* **login:** update sign in auth providers to only Google and email ([1670f9c](https://www.github.com/lilboards/lilboards/commit/1670f9c6bf22fe2885b45b44ffe75c813cf76d38))
* **public:** capitalize title and update description in index.html ([f1ce803](https://www.github.com/lilboards/lilboards/commit/f1ce803003d564defa3e8cea87e78b1eb97d4c84))
* **public:** load Roboto font and font icons in index.html ([737b0ac](https://www.github.com/lilboards/lilboards/commit/737b0ac44a41838b02586c7604679f2db8715278))
* **public:** update name and short_name in manifest.json ([f53d412](https://www.github.com/lilboards/lilboards/commit/f53d412ee7ef55e0784e428c7b39296a736a9a38))
* **public:** update title and description in index.html ([7c8daba](https://www.github.com/lilboards/lilboards/commit/7c8daba406954e3f9920b7fd8e5a9b6b21e1636e))
* **routes:** render Boards in Routes ([d45749a](https://www.github.com/lilboards/lilboards/commit/d45749a7ce874c3f057efca882a7a003e2ffb1f0))


### Bug Fixes

* **env:** set placeholder API key so local development app runs ([c40d524](https://www.github.com/lilboards/lilboards/commit/c40d524033598351f313de5f6d43222cebe86d70))
* **layout:** add margin top and bottom to children ([e052d3f](https://www.github.com/lilboards/lilboards/commit/e052d3f8f54f9761e661bfcfa726b8e99f5fa672))
* **layout:** render Container as main element ([f180f8c](https://www.github.com/lilboards/lilboards/commit/f180f8ce2fdc2e6ef31e6d8c6d81fee9b685e213))
* **layout:** wrap Header in Container so it's aligned with Layout ([7f328f1](https://www.github.com/lilboards/lilboards/commit/7f328f1c5e92015645c59a8e43bda47b1338a04b))
