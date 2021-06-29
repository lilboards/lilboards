# Changelog

### [2.6.1](https://www.github.com/lilboards/lilboards/compare/v2.6.0...v2.6.1) (2021-06-29)


### Bug Fixes

* remove correct board ref in database when board is deleted ([04ef55f](https://www.github.com/lilboards/lilboards/commit/04ef55f756357b3e58a33689e0fdb59859af2fb1))

## [2.6.0](https://www.github.com/lilboards/lilboards/compare/v2.5.0...v2.6.0) (2021-06-29)


### Features

* **components:** listen to items ref value in Columns ([1e87f3a](https://www.github.com/lilboards/lilboards/commit/1e87f3a7569b4b2a103660c2cb0a1438e882a9aa))
* **components:** replace item placeholder with item from store ([a8e137d](https://www.github.com/lilboards/lilboards/commit/a8e137da15fa5e776762a36d80a6199baf3a6470))

## [2.5.0](https://www.github.com/lilboards/lilboards/compare/v2.4.4...v2.5.0) (2021-06-29)


### Features

* **components:** add delete item button to Item ([7e19650](https://www.github.com/lilboards/lilboards/commit/7e19650ebd7b4eb4978f450e151fc45894687ad2))
* **firebase:** add `setColumnItemIds` to database ([46f4989](https://www.github.com/lilboards/lilboards/commit/46f4989c517232f63f2229053d293d7b3b646903))
* **store:** add reducer `loadItems` to itemsSlice ([26e7c07](https://www.github.com/lilboards/lilboards/commit/26e7c077a606359c88a1cc992921d0d631404639))
* **store:** add reducer `removeColumnItemId` to columnsSlice ([7c0007c](https://www.github.com/lilboards/lilboards/commit/7c0007cb019ef431df1ab1e7c7703f77c9d93f1d))
* **store:** add reducer `removeItem` to itemsSlice ([fd62ab5](https://www.github.com/lilboards/lilboards/commit/fd62ab5e8f8268f5cd5183c0c275666ded531f8e))


### Bug Fixes

* **components:** show placeholder item cards ([116f805](https://www.github.com/lilboards/lilboards/commit/116f8052893188c6ca0744aad1fa2b2aec46e677))
* **store:** don't throw error when columnsSlice itemIds is undefined ([0b38bb2](https://www.github.com/lilboards/lilboards/commit/0b38bb266982bf0b395e7f081936e3f150ecffe0))

### [2.4.4](https://www.github.com/lilboards/lilboards/compare/v2.4.3...v2.4.4) (2021-06-28)


### Bug Fixes

* remove items when column is deleted ([89b5b04](https://www.github.com/lilboards/lilboards/commit/89b5b04604c4d2dee253430caec79671727bd263))

### [2.4.3](https://www.github.com/lilboards/lilboards/compare/v2.4.2...v2.4.3) (2021-06-28)


### Bug Fixes

* **components:** autofocus on newly added column ([5ffebd9](https://www.github.com/lilboards/lilboards/commit/5ffebd9217a5ca4123e323d09758dc8566b84f77))
* **components:** reset user editing columnId on blur ([cde9adb](https://www.github.com/lilboards/lilboards/commit/cde9adb1bea98eb2e4b1b296972ef5987c17a285))

### [2.4.2](https://www.github.com/lilboards/lilboards/compare/v2.4.1...v2.4.2) (2021-06-28)


### Performance Improvements

* **firebase:** debounce edit column update database ([1e94142](https://www.github.com/lilboards/lilboards/commit/1e94142136b3dfc1c4cb13a7fb1d97a8178f0e87))

### [2.4.1](https://www.github.com/lilboards/lilboards/compare/v2.4.0...v2.4.1) (2021-06-28)


### Performance Improvements

* **hooks:** use `shallowEqual` as the `equalityFn` in `useSelector` ([25c838a](https://www.github.com/lilboards/lilboards/commit/25c838a9dd213a1e2e43afad75fa2e511f3d4fa0))

## [2.4.0](https://www.github.com/lilboards/lilboards/compare/v2.3.0...v2.4.0) (2021-06-27)


### Features

* debounce save board to database on change instead of on blur ([f6ff028](https://www.github.com/lilboards/lilboards/commit/f6ff028b4019a4158276a0575b0d2c143fc3f7f6))

## [2.3.0](https://www.github.com/lilboards/lilboards/compare/v2.2.0...v2.3.0) (2021-06-27)


### Features

* save board to firebase database on blur ([08f2c81](https://www.github.com/lilboards/lilboards/commit/08f2c818fc31e7210dd52b7476f1fd4dfc7e9a39))


### Bug Fixes

* **components:** reset user editing board id on blur ([6c55307](https://www.github.com/lilboards/lilboards/commit/6c553076ef56c1cb24590af22ba6417b8015335a))

## [2.2.0](https://www.github.com/lilboards/lilboards/compare/v2.1.0...v2.2.0) (2021-06-23)


### Features

* **components:** add Item that renders a blank Card ([b04a013](https://www.github.com/lilboards/lilboards/commit/b04a0138619b5b5fd45df84eae8275c81ed5a9e5))
* **components:** append itemId to columns store in addItem ([2e16a3e](https://www.github.com/lilboards/lilboards/commit/2e16a3ebd553d5c28ca8cae4633728b30b5ceac1))
* **components:** render Item when it's added in Items ([9b5c462](https://www.github.com/lilboards/lilboards/commit/9b5c462d787f7653c84075a857b6da7342b3267b))


### Bug Fixes

* **components:** render the column items ([6572b99](https://www.github.com/lilboards/lilboards/commit/6572b9916add88a7cf981e52d10afb164709c6f9))

## [2.1.0](https://www.github.com/lilboards/lilboards/compare/v2.0.0...v2.1.0) (2021-06-22)


### Features

* **components:** add Items which renders "Add item" button ([158dfab](https://www.github.com/lilboards/lilboards/commit/158dfabf8994a4fbfabec442b2f7f014bc068126))
* **components:** render Items in Columns and stylize column ([bd2f026](https://www.github.com/lilboards/lilboards/commit/bd2f026992f4cfed737cad99fa606e7ce6cdc075))

## [2.0.0](https://www.github.com/lilboards/lilboards/compare/v1.13.1...v2.0.0) (2021-06-21)


### ⚠ BREAKING CHANGES

* board data is saved in ref "boards/:id/board"

### Features

* change location of where board data is saved in database ([2d960ca](https://www.github.com/lilboards/lilboards/commit/2d960cace1484c2a8b0f6a14de08ed84face62c5))


### Bug Fixes

* use correct database ref so board can be edited and deleted ([1692ca4](https://www.github.com/lilboards/lilboards/commit/1692ca4079f73df7b773011219c1f637c369c10f))

### [1.13.1](https://www.github.com/lilboards/lilboards/compare/v1.13.0...v1.13.1) (2021-06-21)


### Bug Fixes

* **components:** don't dispatch action loadBoard for empty payload ([f3af015](https://www.github.com/lilboards/lilboards/commit/f3af0151bd828bdbd3e5092ee4f2e6c904bc784f))

## [1.13.0](https://www.github.com/lilboards/lilboards/compare/v1.12.0...v1.13.0) (2021-06-20)


### Features

* **components:** make column into an editable input in Columns ([a8b77ab](https://www.github.com/lilboards/lilboards/commit/a8b77ab5120eb72e176c175e18a938e214222e3f))
* **store:** add editColumn reducer to columnsSlice ([495e50f](https://www.github.com/lilboards/lilboards/commit/495e50fc143caa0e37c1739502542bf9ce26bc19))

## [1.12.0](https://www.github.com/lilboards/lilboards/compare/v1.11.0...v1.12.0) (2021-06-20)


### Features

* **components:** add delete column button to Columns ([befb96c](https://www.github.com/lilboards/lilboards/commit/befb96cab9da1296d55fb56e807a0bee110ef249))
* **firebase:** add getColumnRef to database ([5170a1b](https://www.github.com/lilboards/lilboards/commit/5170a1b3f07088e9f0fb0196cd4f5d9d2536b6c7))
* **store:** add deleteColumn reducer to columnsSlice ([e6b19cb](https://www.github.com/lilboards/lilboards/commit/e6b19cb4466d524b4f86aaf8c41063a17ff75f90))

## [1.11.0](https://www.github.com/lilboards/lilboards/compare/v1.10.0...v1.11.0) (2021-06-20)


### Features

* **components:** add CloseButton ([96d5f05](https://www.github.com/lilboards/lilboards/commit/96d5f05ca4e786c29dd5ebf8602a63e0e7a46288))

## [1.10.0](https://www.github.com/lilboards/lilboards/compare/v1.9.0...v1.10.0) (2021-06-15)


### Features

* **firebase:** add getBoardRef in database ([b8150d9](https://www.github.com/lilboards/lilboards/commit/b8150d9127421ddfbb7938f832725e5c152f989d))
* **firebase:** add getBoardVal to database ([0e5a335](https://www.github.com/lilboards/lilboards/commit/0e5a3353aeeca0ab06e58a924199bd84847321d6))
* **firebase:** add getColumnsRef in database ([9282609](https://www.github.com/lilboards/lilboards/commit/92826093a4380131455e6515d4768437fdde0e61))
* **firebase:** add getUserRef and getUserBoardsVal to database ([20b4a7d](https://www.github.com/lilboards/lilboards/commit/20b4a7df918e26591e998ec88d7396e2ccffdba4))

## [1.9.0](https://www.github.com/lilboards/lilboards/compare/v1.8.1...v1.9.0) (2021-06-12)


### Features

* **actions:** add columnsSlice actions ([c4a9dcd](https://www.github.com/lilboards/lilboards/commit/c4a9dcdaeb078c24be2af59e6651b8b473e6d221))
* **components:** add column when button is clicked in Board ([30eb881](https://www.github.com/lilboards/lilboards/commit/30eb88120c3161c32b2545a5c5ce2b2def6fb259))
* **components:** add Columns ([a89d72f](https://www.github.com/lilboards/lilboards/commit/a89d72f6982a01472b71cb0379722cb34fc42d53))
* **components:** render "Add column" button in Board ([e9d4996](https://www.github.com/lilboards/lilboards/commit/e9d4996a3d4edf48fe42a40bd1d18e32956d568b))
* **components:** render Columns in Board ([d442af1](https://www.github.com/lilboards/lilboards/commit/d442af1372c5843823d986fd7e2eb4389fd83d3a))
* **store:** add columnsSlice ([013b9b7](https://www.github.com/lilboards/lilboards/commit/013b9b72b996c0f710d102e2949963c1b7935ad6))
* **store:** add columnsSlice reducer to store ([270b063](https://www.github.com/lilboards/lilboards/commit/270b0634f1ca4f639da601c9b9b6b51e10633b62))
* **store:** add reducer `loadColumns` to columnsSlice ([e1c8690](https://www.github.com/lilboards/lilboards/commit/e1c8690a6ceca9d3ec50f4305efbf7342d17fa90))


### Bug Fixes

* **components:** remove columns from store state on unmount ([818beb0](https://www.github.com/lilboards/lilboards/commit/818beb0275f61169559a51797b375bae9c0d04fc))

### [1.8.1](https://www.github.com/lilboards/lilboards/compare/v1.8.0...v1.8.1) (2021-06-09)


### Bug Fixes

* **components:** do not make Board a ProtectedRoute ([6485135](https://www.github.com/lilboards/lilboards/commit/6485135db96e124a80c5e9c7a209ce9f76fc155b))
* **components:** redirect not found board to 404 page ([5734fa4](https://www.github.com/lilboards/lilboards/commit/5734fa4b5c3f426ce5d12913ff9ed2c07abbeb1b))


### Performance Improvements

* **components:** skip effect hook when board exists ([f10fc82](https://www.github.com/lilboards/lilboards/commit/f10fc827f68bdb85c29fd2382e2767620a6b1508))

## [1.8.0](https://www.github.com/lilboards/lilboards/compare/v1.7.1...v1.8.0) (2021-06-09)


### Features

* **components:** replace board placeholder with name ([da4aac0](https://www.github.com/lilboards/lilboards/commit/da4aac0f6e59b5ca210c483f92a4ccdaa82bd504))

### [1.7.1](https://www.github.com/lilboards/lilboards/compare/v1.7.0...v1.7.1) (2021-06-09)


### Bug Fixes

* **store:** ignore undefined board id in `loadBoard` ([84c9d66](https://www.github.com/lilboards/lilboards/commit/84c9d6645f4c1f2657019ecefaf53b6ce91c5656))

## [1.7.0](https://www.github.com/lilboards/lilboards/compare/v1.6.0...v1.7.0) (2021-06-09)


### Features

* save `created` and `updated` timestamp for board ([3a11513](https://www.github.com/lilboards/lilboards/commit/3a11513efe2704e7fd7d326f0bc57934edc23afb))

## [1.6.0](https://www.github.com/lilboards/lilboards/compare/v1.5.0...v1.6.0) (2021-06-08)


### Features

* **actions:** consolidate boards actions ([2200550](https://www.github.com/lilboards/lilboards/commit/2200550de8ded43374d03df6144f38c34694de56))
* **component:** allow board name to be edited ([6a841e5](https://www.github.com/lilboards/lilboards/commit/6a841e53599b682f07f615569d08d519dd00c048))
* **components:** add and render boards ([b5bdd49](https://www.github.com/lilboards/lilboards/commit/b5bdd49030ebcfe21b612efd0945fff593e6ce3e))
* **components:** add Board ([ffcebdc](https://www.github.com/lilboards/lilboards/commit/ffcebdca1a06946ebfb9f2d4ca11c8aeeffc6d2a))
* **components:** add Board to Routes ([37fde90](https://www.github.com/lilboards/lilboards/commit/37fde9049aa53cf1d2b535cc5fb21748c3efe176))
* **components:** add create board button ([5dc2799](https://www.github.com/lilboards/lilboards/commit/5dc2799755844073ed9fdbfa9ce7a2ef1e2098c5))
* **components:** add link to board in Boards ([f984754](https://www.github.com/lilboards/lilboards/commit/f9847542ae1cb3362eb9bebba747324f42644fdf))
* **components:** allow board to be deleted ([8fbebf5](https://www.github.com/lilboards/lilboards/commit/8fbebf5a6a4861b70472857722cb10bc6be718d0))
* **components:** autofocus new board input ([3d2cb8a](https://www.github.com/lilboards/lilboards/commit/3d2cb8a1b8ae93564dfa0c746bfd263098f2d27c))
* **components:** load boards on mount ([328ae18](https://www.github.com/lilboards/lilboards/commit/328ae18cdc308293354af72970d7f83f6800fdf5))
* **components:** stylize copy as heading in Boards ([3b150c3](https://www.github.com/lilboards/lilboards/commit/3b150c37006d930c732c32a1127a0ae949c101f6))
* **firebase:** export database ref 'boards' ([0f8539e](https://www.github.com/lilboards/lilboards/commit/0f8539e7211d73f92af6a008151e8481ca155cbf))
* **firebase:** export usersRef from database ([7c66233](https://www.github.com/lilboards/lilboards/commit/7c66233897ee153a5e7543fc9717a199b3ba81e2))
* load boards owned by the user ([0259176](https://www.github.com/lilboards/lilboards/commit/0259176f16929ab39eeee902dc863d5575c80d16))
* remove board id from users ref when board is deleted ([c8cf76f](https://www.github.com/lilboards/lilboards/commit/c8cf76f386a01de0d9e158d45321fb8cb344552a))
* save board id to users ref ([b7e8bf6](https://www.github.com/lilboards/lilboards/commit/b7e8bf62a5989995a43b5da4af86b87cb07357cc))
* **store:** add `deleteBoard` reducer to boardsSlice ([11e962c](https://www.github.com/lilboards/lilboards/commit/11e962caec147d38e2e15e309e465f3ee45437a8))
* **store:** add boards slice reducer to store ([f2fc3e1](https://www.github.com/lilboards/lilboards/commit/f2fc3e1a074b7597801306fb3441f77b30819b84))
* **store:** add boardsSlice ([9d9a3e6](https://www.github.com/lilboards/lilboards/commit/9d9a3e6f5ddcc92157ee711ec6134056900c5362))
* **store:** add optional board property `focus` ([a1d0d6d](https://www.github.com/lilboards/lilboards/commit/a1d0d6d33b6d58c000994c9aadb93d6ab233bdbd))
* **store:** add reducer `loadBoards` to boardsSlice ([5851a6f](https://www.github.com/lilboards/lilboards/commit/5851a6f6d189f79b8a19d915bdeab11608c5b529))
* **store:** remove board from boardsRef in `deleteBoard` ([6855b2a](https://www.github.com/lilboards/lilboards/commit/6855b2a4bd48a04445780bd2d6d9a511c89b538f))
* **store:** save name when editing board ([ac61a02](https://www.github.com/lilboards/lilboards/commit/ac61a024249aa03512cf651ddb39f7ae5df02177))
* **store:** save new board to firebase database ([2a6af37](https://www.github.com/lilboards/lilboards/commit/2a6af37768c99ae30d4008139d82a0a744d3ed17))
* **store:** update reducers in boardSlice ([6bc6325](https://www.github.com/lilboards/lilboards/commit/6bc6325d9cb7c279ca062010e424d4a6f77aa3a3))
* update Login to save user email to store ([45b19e3](https://www.github.com/lilboards/lilboards/commit/45b19e30c7f1981d66dcea337d57a17d9d2127fe))


### Bug Fixes

* **components:** ensure aria-label is unique in Boards ([7eb3b18](https://www.github.com/lilboards/lilboards/commit/7eb3b185d1e6fc37e7437a9de0bf51dd66f978f3))
* **components:** skip dispatch `loadBoards` if snapshot is null ([1b924fb](https://www.github.com/lilboards/lilboards/commit/1b924fb5535683274575c86f121fd48570ee7c5f))
* reset store on Logout ([11a3ba6](https://www.github.com/lilboards/lilboards/commit/11a3ba65b2c8b6ea4e55813cf213ece4140e6b2a))
* **store:** skip `loadBoards` if payload is null ([5d21466](https://www.github.com/lilboards/lilboards/commit/5d21466cf75a12ded101521868247955caa4e413))


### Performance Improvements

* remove redundant board id in store ([c74fceb](https://www.github.com/lilboards/lilboards/commit/c74fceb6b9cb1e7a53f99bc6535383e335bce121))
* **store:** optimize payload update when board is edited ([8e447ab](https://www.github.com/lilboards/lilboards/commit/8e447abe2b1d7f5e6d623062230da024c12f122b))

## [1.5.0](https://www.github.com/lilboards/lilboards/compare/v1.4.0...v1.5.0) (2021-06-06)


### Features

* **components:** add ProtectedRoute ([353e27f](https://www.github.com/lilboards/lilboards/commit/353e27f87e6cf1b37ec6dea8901cd5abcec7dab1))
* **components:** make Boards a ProtectedRoute ([c50ef70](https://www.github.com/lilboards/lilboards/commit/c50ef704d6c1097b0140fbb9015ce8e43f05e626))
* **components:** redirect to Boards when user is signed in ([88d29e2](https://www.github.com/lilboards/lilboards/commit/88d29e278f0fe41aad7e0fcfbe18bb3350a7f30b))

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
