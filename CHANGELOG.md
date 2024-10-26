# Changelog

## [4.36.0](https://github.com/lilboards/lilboards/compare/v4.35.1...v4.36.0) (2024-10-26)


### Features

* **pages:** render back icon in breadcrumb in Board ([d41e26d](https://github.com/lilboards/lilboards/commit/d41e26d1f7d3f6c992171d24b3f67b0923f2293e))

## [4.35.1](https://github.com/lilboards/lilboards/compare/v4.35.0...v4.35.1) (2024-10-26)


### Bug Fixes

* **database:** use attribute-based access for Firebase Security Rules ([adbb4de](https://github.com/lilboards/lilboards/commit/adbb4de5668daeb7699811de0b8b3725121a912a))

## [4.35.0](https://github.com/lilboards/lilboards/compare/v4.34.2...v4.35.0) (2024-10-26)


### Features

* **pages:** add Lists placeholder ([5152cee](https://github.com/lilboards/lilboards/commit/5152cee19e1ee6fa24f8567cad0f6edd43e8307d))

## [4.34.2](https://github.com/lilboards/lilboards/compare/v4.34.1...v4.34.2) (2024-09-20)

### Miscellaneous Chores

- release 4.34.2 ([18c8098](https://github.com/lilboards/lilboards/commit/18c80987f5bf977a6a3f4d57d49b684cda2a6aff))

## [4.34.1](https://github.com/lilboards/lilboards/compare/v4.34.0...v4.34.1) (2024-04-22)

### Miscellaneous Chores

- release 4.34.1 ([7c01783](https://github.com/lilboards/lilboards/commit/7c017835e545af785ae2462c2687e11d367e8bb7))

## [4.34.0](https://github.com/lilboards/lilboards/compare/v4.33.11...v4.34.0) (2024-01-01)

### Features

- **Item:** render links with Linkify ([a068dec](https://github.com/lilboards/lilboards/commit/a068dec412e3e84dbf8cc429ce4d7a223b9dc7d9))

## [4.33.11](https://github.com/lilboards/lilboards/compare/v4.33.10...v4.33.11) (2024-01-01)

### Bug Fixes

- rename `realtime` to `real-time` ([d270375](https://github.com/lilboards/lilboards/commit/d2703758a2c4bbc41b927a3fe1053c71001eeee5))

## [4.33.10](https://github.com/lilboards/lilboards/compare/v4.33.9...v4.33.10) (2023-12-31)

### Performance Improvements

- **components:** remove inefficient createSelector in Export ([3583e1e](https://github.com/lilboards/lilboards/commit/3583e1e32f7aff36fb3be4ccec2388b773abd343))

## [4.33.9](https://github.com/lilboards/lilboards/compare/v4.33.8...v4.33.9) (2023-11-27)

### Bug Fixes

- **public:** fix manifest.json property 'start_url' ([393d351](https://github.com/lilboards/lilboards/commit/393d351c1e1ebaabc5e1587135013af83a3451fc))
- **public:** set manifest.json property 'src' to absolute url ([92769d6](https://github.com/lilboards/lilboards/commit/92769d6e4c4c253a3cd92ebcf6ff3a11f748dfed))
- **public:** set manifest.json property 'start_url' to absolute url ([16f8b8b](https://github.com/lilboards/lilboards/commit/16f8b8b056c2e7bc66f7083f6265ebc1423b524d))

## [4.33.8](https://github.com/lilboards/lilboards/compare/v4.33.7...v4.33.8) (2023-11-27)

### Bug Fixes

- fix paths in index.html and remove comments ([ed2b858](https://github.com/lilboards/lilboards/commit/ed2b8588ea15fdcc35c560de5b205e30cf52451d))

## [4.33.7](https://github.com/lilboards/lilboards/compare/v4.33.6...v4.33.7) (2023-11-27)

### Build System

- migrate from Create React App (CRA) to Vite ([33b1da4](https://github.com/lilboards/lilboards/commit/33b1da4456caabca241bfe2e59189bad4ad15d88)), closes [#1542](https://github.com/lilboards/lilboards/issues/1542)

## [4.33.6](https://github.com/lilboards/lilboards/compare/v4.33.5...v4.33.6) (2023-11-20)

### Miscellaneous Chores

- release 4.33.6 ([5334f53](https://github.com/lilboards/lilboards/commit/5334f53e5fa3fea247cf0a05db84ac3417e266c8))

## [4.33.5](https://github.com/lilboards/lilboards/compare/v4.33.4...v4.33.5) (2023-07-04)

### Bug Fixes

- **BoardControls:** replace menu icon with more icon ([e99d494](https://github.com/lilboards/lilboards/commit/e99d494ff4ca27d15a8a6bd71f2cee59c33c89c7))

## [4.33.4](https://github.com/lilboards/lilboards/compare/v4.33.3...v4.33.4) (2023-07-03)

### Bug Fixes

- **BoardControls:** use Popover in smaller screens for responsiveness ([fa5e474](https://github.com/lilboards/lilboards/commit/fa5e4740d77f6ad837db6ca869b2f5f6cc866fc5))

## [4.33.3](https://github.com/lilboards/lilboards/compare/v4.33.2...v4.33.3) (2023-07-02)

### Bug Fixes

- **BoardControls:** trim newline when copying board as markdown ([e3ea866](https://github.com/lilboards/lilboards/commit/e3ea866e3b9b9d811e39c307ca8757a48dae5bbc))

## [4.33.2](https://github.com/lilboards/lilboards/compare/v4.33.1...v4.33.2) (2023-07-02)

### Bug Fixes

- **BoardControls:** update Export to copy columns with default name ([d88b73e](https://github.com/lilboards/lilboards/commit/d88b73ebfa7226986607ae4d95fca02cf080e4b0))

## [4.33.1](https://github.com/lilboards/lilboards/compare/v4.33.0...v4.33.1) (2023-06-22)

### Performance Improvements

- **BoardControls:** use createSelector in Export and fix test warning ([0cd24a7](https://github.com/lilboards/lilboards/commit/0cd24a7805d968569ba6971e44618d5d63da29a9))
- **Boards:** use createSelector in BoardCards ([c0a409f](https://github.com/lilboards/lilboards/commit/c0a409f5b3111468a16c21f1a2011cd1c595bc90))
- **Columns:** use createSelector in Columns ([5170a4c](https://github.com/lilboards/lilboards/commit/5170a4cb3c17392dc7c0dcc4d4cc56c20505801e))
- **Column:** use createSelector in Column ([0e80c01](https://github.com/lilboards/lilboards/commit/0e80c0167fbad98e5725a9192a95682990028648))
- **Column:** use createSelector in ColumnName ([73f1986](https://github.com/lilboards/lilboards/commit/73f198623fbd97908aa7242c8b37e6d673d47775))

## [4.33.0](https://github.com/lilboards/lilboards/compare/v4.32.0...v4.33.0) (2023-06-19)

### Features

- **Header:** change the SupportIcon to the HelpIcon ([9191454](https://github.com/lilboards/lilboards/commit/91914543525ce3ed6a6006dc84a1e41f659de465))

## [4.32.0](https://github.com/lilboards/lilboards/compare/v4.31.0...v4.32.0) (2023-04-02)

### Features

- **Item:** confirm with dialog before delete ([fb25487](https://github.com/lilboards/lilboards/commit/fb254871504cff3d1a6c4cbae316d862744b4610))

## [4.31.0](https://github.com/lilboards/lilboards/compare/v4.30.0...v4.31.0) (2023-03-26)

### Features

- **components:** replace double quotes inside Item aria-label ([eec866d](https://github.com/lilboards/lilboards/commit/eec866d9791e21a30274d24bf702e1e3c920ad39))

## [4.30.0](https://github.com/lilboards/lilboards/compare/v4.29.0...v4.30.0) (2023-03-25)

### Features

- **BoardCard:** replace double quotes ([434d203](https://github.com/lilboards/lilboards/commit/434d203828dc2b28373e7048c7585102984febf2))
- **Column:** show DeleteDialog before deleting column in ColumnName ([fad2107](https://github.com/lilboards/lilboards/commit/fad21074d7685a30798853685df1503c2c30e29a))

### Bug Fixes

- **CloseButton:** override size prop on IconButton ([52f2ca0](https://github.com/lilboards/lilboards/commit/52f2ca0055a160e91450624288892fb3db58668a))
- **ColumnName:** center the CloseButton vertically ([7602ac8](https://github.com/lilboards/lilboards/commit/7602ac87615a2eac2e872c01d53ca7db28fbef27))

## [4.29.0](https://github.com/lilboards/lilboards/compare/v4.28.0...v4.29.0) (2023-03-19)

### Features

- **BoardCard:** show confirmation dialog before deleting board ([ec23767](https://github.com/lilboards/lilboards/commit/ec237675091464007480eed922e101495c29f62c))

## [4.28.0](https://github.com/lilboards/lilboards/compare/v4.27.0...v4.28.0) (2023-03-10)

### Features

- **pages:** create ErrorBoundary ([c1a29f4](https://github.com/lilboards/lilboards/commit/c1a29f4010b1d62a1565e172f79215e3373c7aec))
- **routes:** set root Route errorElement to ErrorBoundary ([5eeabce](https://github.com/lilboards/lilboards/commit/5eeabce8966f65edb60d7febc4c1816b3e805dad))

## [4.27.0](https://github.com/lilboards/lilboards/compare/v4.26.0...v4.27.0) (2023-03-09)

### Features

- **components:** add Connection that detects Firebase Database client ([eca498d](https://github.com/lilboards/lilboards/commit/eca498d9c4e8f69d3e77dee53c0967722d44331a))
- **firebase:** export onConnected from database ([c257ca8](https://github.com/lilboards/lilboards/commit/c257ca8031d5733ddfd694638caed21e94e2a8ac))
- **pages:** render Connection in Board and Boards ([bfa058e](https://github.com/lilboards/lilboards/commit/bfa058eb51fc010f687dfd22e032672560faf540))

### Bug Fixes

- **components:** load app before checking Firebase connection ([1a4d633](https://github.com/lilboards/lilboards/commit/1a4d633c3dda734e25b2bdfe47328558f65df868))

## [4.26.0](https://github.com/lilboards/lilboards/compare/v4.25.0...v4.26.0) (2023-03-05)

### Features

- **components:** add title to icons in Header ([f51ccd0](https://github.com/lilboards/lilboards/commit/f51ccd00ac080044c77f54a567cbd7e47ef33038))
- **components:** render support link in Header ([e20b0b8](https://github.com/lilboards/lilboards/commit/e20b0b8984d7e85a5c6f4327c514943858699517))
- **pages:** change to public GitHub issue & discussion links in Support ([b8b5d0c](https://github.com/lilboards/lilboards/commit/b8b5d0c2e7b0b5d0b940e58076286bd347cb0e63))
- **pages:** create Support ([da3cb17](https://github.com/lilboards/lilboards/commit/da3cb17aea9b93fcfc03daffb76626b513705c42))
- **routes:** add "/support" ([f703ce2](https://github.com/lilboards/lilboards/commit/f703ce28ce1ce70b17402538a7658beb347685bd))

## [4.25.0](https://github.com/lilboards/lilboards/compare/v4.24.1...v4.25.0) (2023-01-01)

### Features

- **Column:** improve label names ([ab85467](https://github.com/lilboards/lilboards/commit/ab854675420cf16a811a904d6301fc4574e45211))
- **Item:** add item text to LikeButton label ([a7ccbc9](https://github.com/lilboards/lilboards/commit/a7ccbc94aff4715151110c2ce1f96181209a2b1c))
- **Item:** use item text instead of id for label name ([517671c](https://github.com/lilboards/lilboards/commit/517671c05a2f78d7982a39ac15d3bd9e3a0c7a0c))

## [4.24.1](https://github.com/lilboards/lilboards/compare/v4.24.0...v4.24.1) (2022-12-30)

### Bug Fixes

- **store:** delete board from store when firebase value is null ([1f64847](https://github.com/lilboards/lilboards/commit/1f648474c7b6b99756368f8958080758e8d3c94f))

## [4.24.0](https://github.com/lilboards/lilboards/compare/v4.23.1...v4.24.0) (2022-12-30)

### Features

- **pages:** render text instead of label for "Add board" button ([dc78e48](https://github.com/lilboards/lilboards/commit/dc78e483f09b5e2ee350b714fd14391c47c491bb))

## [4.23.1](https://github.com/lilboards/lilboards/compare/v4.23.0...v4.23.1) (2022-11-14)

### Bug Fixes

- **components:** fix margins of BoardControls ([3128103](https://github.com/lilboards/lilboards/commit/31281035923083f45b8c3e25b9c574ecd4ae4d67))

## [4.23.0](https://github.com/lilboards/lilboards/compare/v4.22.0...v4.23.0) (2022-11-13)

### Features

- **public:** add Open Graph meta tags to index.html ([06724a6](https://github.com/lilboards/lilboards/commit/06724a6975f89282adcce9f2cdc6bfe3b9a89986))

## [4.22.0](https://github.com/lilboards/lilboards/compare/v4.21.0...v4.22.0) (2022-11-13)

### Features

- **pages:** render breadcrumbs in Board ([348b96d](https://github.com/lilboards/lilboards/commit/348b96dbe4993fe6d5c828b55d39ec754ad81425))

## [4.21.0](https://github.com/lilboards/lilboards/compare/v4.20.6...v4.21.0) (2022-11-13)

### Features

- **components:** update Export icon and improve copy and margin ([888c56d](https://github.com/lilboards/lilboards/commit/888c56d50e5a0186a004fbe001a3dcd985070512))

## [4.20.6](https://github.com/lilboards/lilboards/compare/v4.20.5...v4.20.6) (2022-11-13)

### Performance Improvements

- **components:** code-split and lazy-load components in routes ([ba2e30c](https://github.com/lilboards/lilboards/commit/ba2e30cc5256e730f745423d2c040b6c19f1a387))

## [4.20.5](https://github.com/lilboards/lilboards/compare/v4.20.4...v4.20.5) (2022-10-30)

### Bug Fixes

- **Header:** don't let "Lilboards" link take full width ([e2cea4b](https://github.com/lilboards/lilboards/commit/e2cea4ba2e94772f1152b752c8a5d823fd4881f3))

## [4.20.4](https://github.com/lilboards/lilboards/compare/v4.20.3...v4.20.4) (2022-10-23)

### Performance Improvements

- replace react-dom with react-dom/client and use React 18 ([c88774d](https://github.com/lilboards/lilboards/commit/c88774d8ee6f93269dd13e8d5096c602491d121f))

## [4.20.3](https://github.com/lilboards/lilboards/compare/v4.20.2...v4.20.3) (2022-10-23)

### Code Refactoring

- **components:** replace firebaseui-web-react with firebaseui ([c18c6df](https://github.com/lilboards/lilboards/commit/c18c6df1da6d675a748590a74a75376eaca6b15c))

## [4.20.2](https://github.com/lilboards/lilboards/compare/v4.20.1...v4.20.2) (2022-10-16)

### Bug Fixes

- **utils:** change `replaceAll` to `replace` in transform.ts ([9860027](https://github.com/lilboards/lilboards/commit/9860027b4c8f8971f729433f356a0aa2629a447a))

## [4.20.1](https://github.com/lilboards/lilboards/compare/v4.20.0...v4.20.1) (2022-07-17)

### Bug Fixes

- don't make column items temporarily disappear during rename ([47e1cec](https://github.com/lilboards/lilboards/commit/47e1cec9c7af3c80611bc14d9ddd515613c65b48))

## [4.20.0](https://github.com/lilboards/lilboards/compare/v4.19.0...v4.20.0) (2022-05-20)

### Features

- **BoardControls:** replace alert with snackbar in Timer ([0cc2725](https://github.com/lilboards/lilboards/commit/0cc272502401be3db5a8d098be94aa8b0052d34c))

## [4.19.0](https://www.github.com/lilboards/lilboards/compare/v4.18.0...v4.19.0) (2022-05-20)

### Features

- **BoardControls:** change copy & tooltip for export board button ([f90acc1](https://www.github.com/lilboards/lilboards/commit/f90acc15b3dbd47fbe7f34cd22e3670f3547699f))
- **BoardControls:** replace "Export" text with icon button ([d378895](https://www.github.com/lilboards/lilboards/commit/d378895c98cca8dc0f442bcfcb29ad26cd13cef8))

## [4.18.0](https://www.github.com/lilboards/lilboards/compare/v4.17.0...v4.18.0) (2022-05-06)

### Features

- **Board:** add icon button to copy board link to clipboard ([7ac6b89](https://www.github.com/lilboards/lilboards/commit/7ac6b89310bb0f72a72cfa61b3a63e8c69529aca))

## [4.17.0](https://www.github.com/lilboards/lilboards/compare/v4.16.0...v4.17.0) (2022-03-25)

### Features

- **components:** set document title for all routes ([d8ef8ad](https://www.github.com/lilboards/lilboards/commit/d8ef8ad1819864403e68ca00b8ed65a1b2ccfeaa))
- **hooks:** create set document title helper ([34bdee4](https://www.github.com/lilboards/lilboards/commit/34bdee4bfa62910989b0174bb0584c02fb4ca5f9))
- **public:** update document title ([8219a4b](https://www.github.com/lilboards/lilboards/commit/8219a4bdbee79014e254c438b8b6930430dc5da7))

## [4.16.0](https://www.github.com/lilboards/lilboards/compare/v4.15.1...v4.16.0) (2022-03-11)

### Features

- **Item:** save item to firebase onChange instead of onBlur ([106061e](https://www.github.com/lilboards/lilboards/commit/106061e8a9ba860a2c2e5bb8d1079144f10767ec))
- **Login:** add Twitter as an auth provider ([f8bce55](https://www.github.com/lilboards/lilboards/commit/f8bce552a6bf761a4948d13e7e8ec85bb68ba134))

## [4.15.1](https://www.github.com/lilboards/lilboards/compare/v4.15.0...v4.15.1) (2022-02-26)

### Bug Fixes

- **utils:** replace newline with `<br>` when exporting board to markdown ([973f438](https://www.github.com/lilboards/lilboards/commit/973f4389259e11288c119052640f40ed5ebc2956))

## [4.15.0](https://www.github.com/lilboards/lilboards/compare/v4.14.1...v4.15.0) (2022-02-21)

### Features

- **components:** add Export that copies Markdown to clipboard ([2a8461d](https://www.github.com/lilboards/lilboards/commit/2a8461ddf0524d767a4e400613a8e7ebff7a9d9a))
- **components:** render Export button in BoardControls ([39abf47](https://www.github.com/lilboards/lilboards/commit/39abf47dd04097332e7beee520a504445aa01920))
- **components:** show tooltip when Export button is clicked ([34ab654](https://www.github.com/lilboards/lilboards/commit/34ab654d1bce0750cddff1bbc7dc5da12d3e3198))

## [4.14.1](https://www.github.com/lilboards/lilboards/compare/v4.14.0...v4.14.1) (2022-02-11)

### Bug Fixes

- don't save board to database if user is not admin ([5ef385a](https://www.github.com/lilboards/lilboards/commit/5ef385ac7c3f8f04a04ff194f3af18bb9e3b752c))

## [4.14.0](https://www.github.com/lilboards/lilboards/compare/v4.13.0...v4.14.0) (2022-01-19)

### Features

- **components:** don't render "Sort by likes" for non-admin user ([10e72ea](https://www.github.com/lilboards/lilboards/commit/10e72eac341207408755bf285912ef9976cf55c7))

## [4.13.0](https://www.github.com/lilboards/lilboards/compare/v4.12.0...v4.13.0) (2022-01-19)

### Features

- **components:** play alarm audio on timer end ([c845db3](https://www.github.com/lilboards/lilboards/commit/c845db3af27d5d1cf160cbd1fcf9921df6239e09))

## [4.12.0](https://www.github.com/lilboards/lilboards/compare/v4.11.0...v4.12.0) (2021-12-09)

### Features

- **components:** add home Features ([cb6cc4d](https://www.github.com/lilboards/lilboards/commit/cb6cc4d17d82e8e441d2f4019c2f1b2d368aa887))
- **components:** add home Hero ([fd117f9](https://www.github.com/lilboards/lilboards/commit/fd117f9298af3388b440d43fc65d8f734fc27f38))
- **components:** render Hero and Features in Home; modularize Footer ([6c097fe](https://www.github.com/lilboards/lilboards/commit/6c097fef6ea133236c47ff8a0044561e07878606))

## [4.11.0](https://www.github.com/lilboards/lilboards/compare/v4.10.0...v4.11.0) (2021-12-08)

### Features

- **components:** add MaxLikes ([8464e54](https://www.github.com/lilboards/lilboards/commit/8464e542d2c43daeb690d43a1b4c9ce602e8a45d))
- **components:** check maxLikes in LikeButton ([2535ae5](https://www.github.com/lilboards/lilboards/commit/2535ae5fea3006b6225f944d04050b40778b7500))
- **components:** remove item id from aria-label for Likes & LikeButton ([11d381a](https://www.github.com/lilboards/lilboards/commit/11d381a2c651cdffa00c486764ead6abaf8790c1))
- **components:** render MaxLikes in BoardControls ([0ce1151](https://www.github.com/lilboards/lilboards/commit/0ce1151a1b2d12aa00fb46906c87e27e250c30db))
- **hooks:** add useMaxLikes ([63c2c40](https://www.github.com/lilboards/lilboards/commit/63c2c40a09002532179f47d4b07851bb6d534729))

## [4.10.0](https://www.github.com/lilboards/lilboards/compare/v4.9.3...v4.10.0) (2021-12-07)

### Features

- **components:** decrease Timer input max and size ([d2af6d4](https://www.github.com/lilboards/lilboards/commit/d2af6d4a7fd8acf2b0192f0caef2eeff09512138))

## [4.9.3](https://www.github.com/lilboards/lilboards/compare/v4.9.2...v4.9.3) (2021-11-16)

### Bug Fixes

- **store:** delete column itemIds when payload itemIds is empty ([9be779d](https://www.github.com/lilboards/lilboards/commit/9be779d2bcbd50be3a364f0efedd64eb24167a60))

## [4.9.2](https://www.github.com/lilboards/lilboards/compare/v4.9.1...v4.9.2) (2021-11-15)

### Performance Improvements

- upgrade firebase from v8 to v9 ([87a8860](https://www.github.com/lilboards/lilboards/commit/87a88604f59fd8b7f281dd79d7ab7eb58abe58ba))

## [4.9.1](https://www.github.com/lilboards/lilboards/compare/v4.9.0...v4.9.1) (2021-11-10)

### Bug Fixes

- **components:** move delete button to BoardCard bottom ([caf86ac](https://www.github.com/lilboards/lilboards/commit/caf86ac7c8c2a45350ff08e4054f060752db56b9))

## [4.9.0](https://www.github.com/lilboards/lilboards/compare/v4.8.1...v4.9.0) (2021-11-08)

### Features

- migrate MUI from v4 to v5 ([18983e0](https://www.github.com/lilboards/lilboards/commit/18983e0d9f520e2b49b755201df2d727c260213e))

### Bug Fixes

- **components:** underline Header homepage link on hover ([a4ead31](https://www.github.com/lilboards/lilboards/commit/a4ead31a0bb79fff73aae89929c60fe8a4f347cf))

## [4.8.1](https://www.github.com/lilboards/lilboards/compare/v4.8.0...v4.8.1) (2021-10-26)

### Bug Fixes

- **components:** rename "Present" to "Hide Likes" in board controls ([c59034a](https://www.github.com/lilboards/lilboards/commit/c59034a0955f7780da556e5530c0d7de1276cf4a))

## [4.8.0](https://www.github.com/lilboards/lilboards/compare/v4.7.0...v4.8.0) (2021-09-01)

### Features

- **components:** only allow board creator to edit Timer ([5e93b64](https://www.github.com/lilboards/lilboards/commit/5e93b644b40a8dedea0d0f647c0dd57a749aa348))
- **components:** render Timer in BoardControls ([ad3234c](https://www.github.com/lilboards/lilboards/commit/ad3234c73947e2b9e2c82aefa68ca9571a5739f3))
- **components:** save timerEnd to store and firebase in Timer ([09319cb](https://www.github.com/lilboards/lilboards/commit/09319cbf35f46df2e79380aeb91172576411d673))
- **components:** start and stop Timer and show alert at timer end ([68f1b55](https://www.github.com/lilboards/lilboards/commit/68f1b556f01c3f32b36aeef0a9e25941e9102efe))
- **utils:** add timer helper methods and constants ([ebeda56](https://www.github.com/lilboards/lilboards/commit/ebeda5686aa503aba8c44544249b50e6b334e2c3))

### Bug Fixes

- **components:** render editable Timer for board creator ([9a47bb0](https://www.github.com/lilboards/lilboards/commit/9a47bb0c366924257fc2adc1c8675a4261d345a7))
- **hooks:** update useBoard to dispatch action in setTimeout ([df99119](https://www.github.com/lilboards/lilboards/commit/df99119773a8738ea657be37ba7375e824050af3))

## [4.7.0](https://www.github.com/lilboards/lilboards/compare/v4.6.0...v4.7.0) (2021-08-23)

### Features

- **components:** create Present ([666fd0e](https://www.github.com/lilboards/lilboards/commit/666fd0e88f056ee62b4a0ef4ba2148b44be397aa))
- **components:** don't show filled LikeButton when user's presenting ([a8e7dc1](https://www.github.com/lilboards/lilboards/commit/a8e7dc1345ee7e260f1bb8d145b3cda936401379))
- **components:** render Present in BoardControls ([089e4df](https://www.github.com/lilboards/lilboards/commit/089e4dfd8ac37d5dda5b356b830789f98b537166))
- **store:** add toggleUserPresenting to userSlice ([8d7bf10](https://www.github.com/lilboards/lilboards/commit/8d7bf1065a2581a0c3bc58caf2fa2f4abb6f286c))

## [4.6.0](https://www.github.com/lilboards/lilboards/compare/v4.5.2...v4.6.0) (2021-08-21)

### Features

- **components:** add GitHub, remarkablemark, & version links in Home ([1f50fcd](https://www.github.com/lilboards/lilboards/commit/1f50fcd10b9e26c089a678c21e2e67f882f29bc0))
- **components:** replace Header GitHub link with Bitly link ([7dd3c0a](https://www.github.com/lilboards/lilboards/commit/7dd3c0ab81f71c20b6e8252827c14494e7369d21))

## [4.5.2](https://www.github.com/lilboards/lilboards/compare/v4.5.1...v4.5.2) (2021-08-17)

### Bug Fixes

- **components:** change card bgcolor when dragging over combine ([196d994](https://www.github.com/lilboards/lilboards/commit/196d9945d1fa4c3f9a184c4c713bc1ec89027f92))

## [4.5.1](https://www.github.com/lilboards/lilboards/compare/v4.5.0...v4.5.1) (2021-08-16)

### Bug Fixes

- **components:** ensure GitHub icon button link displays in Header ([15b885b](https://www.github.com/lilboards/lilboards/commit/15b885b5310823a2eab6461ee5e191e2aaa6377c))

## [4.5.0](https://www.github.com/lilboards/lilboards/compare/v4.4.0...v4.5.0) (2021-08-14)

### Features

- **components:** add GitHub as auth provider in Login ([737f589](https://www.github.com/lilboards/lilboards/commit/737f5891985ea621ac156d6855cc288967adb457))

## [4.4.0](https://www.github.com/lilboards/lilboards/compare/v4.3.2...v4.4.0) (2021-08-09)

### Features

- **components:** add Snackbar ([576c459](https://www.github.com/lilboards/lilboards/commit/576c45924816e58bf1f93640686bdd360126c5ec))
- **components:** render Snackbar in VerifyEmail ([ed6d8e9](https://www.github.com/lilboards/lilboards/commit/ed6d8e9cac8c4591630e0433cec18ff5e50030b9))
- **components:** set button color and outline in VerifyEmail ([a217091](https://www.github.com/lilboards/lilboards/commit/a2170916299387d94c61d0822e0a0d7c911faaeb))

## [4.3.2](https://www.github.com/lilboards/lilboards/compare/v4.3.1...v4.3.2) (2021-08-08)

### Bug Fixes

- **database:** read and write to users if email is verified ([9b25f95](https://www.github.com/lilboards/lilboards/commit/9b25f955e98d04019a373bc2b057aee61a81f00d))

## [4.3.1](https://www.github.com/lilboards/lilboards/compare/v4.3.0...v4.3.1) (2021-08-08)

### Bug Fixes

- **components:** remind user to log out after email is verified ([6fcc6a3](https://www.github.com/lilboards/lilboards/commit/6fcc6a32b23d50237b3c86bb46970257a6259d7b))
- **components:** render VerifyEmail if email is unverified in Protected ([2137d9b](https://www.github.com/lilboards/lilboards/commit/2137d9b444af2c8660d09b7959529fa23f443580)), closes [#233](https://www.github.com/lilboards/lilboards/issues/233)

## [4.3.0](https://www.github.com/lilboards/lilboards/compare/v4.2.0...v4.3.0) (2021-08-02)

### Features

- **components:** render GitHub link in Header ([35e4b5a](https://www.github.com/lilboards/lilboards/commit/35e4b5ab12abfb88623a7ea738e25dca96b13d67))
- update description in package.json, index.html, and Home ([f04f9d7](https://www.github.com/lilboards/lilboards/commit/f04f9d779e6785769124b477e14ea049e463d049))

## [4.2.0](https://www.github.com/lilboards/lilboards/compare/v4.1.3...v4.2.0) (2021-08-01)

### Features

- **public:** add favicon and app icons ([10c0ce6](https://www.github.com/lilboards/lilboards/commit/10c0ce66c24da9c5984a7e4368cb02ff42641f40))

## [4.1.3](https://www.github.com/lilboards/lilboards/compare/v4.1.2...v4.1.3) (2021-07-31)

### Performance Improvements

- **hooks:** listen to separate ref events in useColumns ([a64cd56](https://www.github.com/lilboards/lilboards/commit/a64cd5688948022acb743c8bbf40aa8555cdae0a))

## [4.1.2](https://www.github.com/lilboards/lilboards/compare/v4.1.1...v4.1.2) (2021-07-25)

### Bug Fixes

- **hooks:** set is loaded to true as else condition in useAuth ([49d4946](https://www.github.com/lilboards/lilboards/commit/49d494636a2cca754defe3134c06ffb38cec8573))

## [4.1.1](https://www.github.com/lilboards/lilboards/compare/v4.1.0...v4.1.1) (2021-07-25)

### Bug Fixes

- **components:** wrap Board in Auth so anonymous user sees board ([e6ef2b8](https://www.github.com/lilboards/lilboards/commit/e6ef2b876b42b3302e41c9f8229e7f43f972c0d7))
- **hooks:** don't set state until anonymous sign in is successful ([dfb1574](https://www.github.com/lilboards/lilboards/commit/dfb15745ef332c6dffc137fa320f3b838c9a9d3f))
- **hooks:** log 'login' event and return loaded state in useAuth ([0344a6d](https://www.github.com/lilboards/lilboards/commit/0344a6d36e38c8c46133e4aa965cda1efc5dd30e))

## [4.1.0](https://www.github.com/lilboards/lilboards/compare/v4.0.3...v4.1.0) (2021-07-19)

### Features

- redirect to previous route if applicable on login ([705f292](https://www.github.com/lilboards/lilboards/commit/705f2929ca7a1de04f5e78a4f0524ddf03460f1a))

### Bug Fixes

- **components:** redirect to "/boards" when location state is "/" ([afdd8b7](https://www.github.com/lilboards/lilboards/commit/afdd8b7870131d738fec22e7bb03f61764ef11af))

## [4.0.3](https://www.github.com/lilboards/lilboards/compare/v4.0.2...v4.0.3) (2021-07-18)

### Bug Fixes

- **components:** don't render boards link in header unless logged in ([7dcf08f](https://www.github.com/lilboards/lilboards/commit/7dcf08fed9f283feb1646382d7aaba8118b94a49))

## [4.0.2](https://www.github.com/lilboards/lilboards/compare/v4.0.1...v4.0.2) (2021-07-18)

### Bug Fixes

- sort boards by created at date descending ([ac76f1d](https://www.github.com/lilboards/lilboards/commit/ac76f1df2747a9ac45e23d5cb88ce5f93036b979))

## [4.0.1](https://www.github.com/lilboards/lilboards/compare/v4.0.0...v4.0.1) (2021-07-17)

### Bug Fixes

- update likes on combine items ([24e2bdf](https://www.github.com/lilboards/lilboards/commit/24e2bdfcafea778d6cb96235c8865b10989003e9))

## [4.0.0](https://www.github.com/lilboards/lilboards/compare/v3.3.1...v4.0.0) (2021-07-12)

### ⚠ BREAKING CHANGES

- likes is saved in board instead of item in database

### Bug Fixes

- **database:** enable read/write permissions for likes (auth.uid) ([ce3b0d3](https://www.github.com/lilboards/lilboards/commit/ce3b0d399b14da362ad2d1dc9c4271aee444be8b))
- **hooks:** reset likes store if likes snapshot value is null ([34a6c63](https://www.github.com/lilboards/lilboards/commit/34a6c63554784bb3edb839697d7cabfcfbb5e274))
- remove likes item from database when item is deleted ([5144b2f](https://www.github.com/lilboards/lilboards/commit/5144b2f4d03a98a6c30ea675ababe4d364e5b033))
- remove likes item(s) from database when column is deleted ([eae1082](https://www.github.com/lilboards/lilboards/commit/eae1082d7ae1c1f0a825726dbfd0028918bd9b16))

### Code Refactoring

- change where likes are saved in store and database ([8941630](https://www.github.com/lilboards/lilboards/commit/894163014f2e1113a29ddc084874fb4ca921cfb4))

## [3.3.1](https://www.github.com/lilboards/lilboards/compare/v3.3.0...v3.3.1) (2021-07-11)

### Bug Fixes

- replace itemsRef listener "value" with child listeners ([2af4a55](https://www.github.com/lilboards/lilboards/commit/2af4a55ce0eeddf9a6a7578a8260ddeee85ff030))

## [3.3.0](https://www.github.com/lilboards/lilboards/compare/v3.2.2...v3.3.0) (2021-07-11)

### Features

- **components:** log event 'update_item' to firebase analytics ([c7d3609](https://www.github.com/lilboards/lilboards/commit/c7d3609caaec369c04eea151e1fd24a9e9625a4e))

### Performance Improvements

- don't save item to firebase database on change but on blur ([9fb8e20](https://www.github.com/lilboards/lilboards/commit/9fb8e20a61c4240649959016510e49b47d0a4a72))

## [3.2.2](https://www.github.com/lilboards/lilboards/compare/v3.2.1...v3.2.2) (2021-07-07)

### Bug Fixes

- update database.rules.json so auth user can delete board ([9d0e5b9](https://www.github.com/lilboards/lilboards/commit/9d0e5b9289e9456bf1172d891a87abfc76eeb05e))

## [3.2.1](https://www.github.com/lilboards/lilboards/compare/v3.2.0...v3.2.1) (2021-07-07)

### Bug Fixes

- secure read and write to firebase with database.rules.json ([14b246c](https://www.github.com/lilboards/lilboards/commit/14b246c162e4c72d72605dc9c175cac38dce6136))
- update database.rules.json so anonymous users can edit board ([15844c7](https://www.github.com/lilboards/lilboards/commit/15844c7e82994e5c72796353d9db198ade6e3033))

## [3.2.0](https://www.github.com/lilboards/lilboards/compare/v3.1.0...v3.2.0) (2021-07-06)

### Features

- **firebase:** add analytics ([418f13e](https://www.github.com/lilboards/lilboards/commit/418f13ed7f1cc3f103ccd75be3ebd277fafde303))
- log events 'create_board' and 'delete_board' with analytics ([84d1b71](https://www.github.com/lilboards/lilboards/commit/84d1b716497ef3ba729d6c932cdb255196ef6f4b))
- log events 'create_column' and 'delete_column' with analytics ([8ba7175](https://www.github.com/lilboards/lilboards/commit/8ba71758b36f56da076ac9a7f259e63361a2bed2))
- log events 'create_item' and 'delete_item' with analytics ([1571c48](https://www.github.com/lilboards/lilboards/commit/1571c48cf89bdf58655abfc2ce01816d2cdbf0e4))
- log events 'login' and 'logout' with firebase analytics ([7f198dc](https://www.github.com/lilboards/lilboards/commit/7f198dc46db81be8a96a74ad050aae4865b33f0e))
- set firebase analytics user id in userSlice reducer setUser ([ba28cf7](https://www.github.com/lilboards/lilboards/commit/ba28cf7d4b78448fcac827e125dca93ea9da8878))

## [3.1.0](https://www.github.com/lilboards/lilboards/compare/v3.0.0...v3.1.0) (2021-07-05)

### Features

- save create* and update* data for board, column, and item ([feaf689](https://www.github.com/lilboards/lilboards/commit/feaf689193e5133afdf3d5c41d4220d4fc7526ba))

## [3.0.0](https://www.github.com/lilboards/lilboards/compare/v2.17.0...v3.0.0) (2021-07-05)

### ⚠ BREAKING CHANGES

- `creator` has been renamed to `createdBy`
- `updated` has been renamed to `updatedAt`
- `created` has been renamed to `createdAt`

### Code Refactoring

- rename `created` to `createdAt` ([743c32f](https://www.github.com/lilboards/lilboards/commit/743c32f2c77d900de1b328dc7d6a7df2f73b0f0f))
- rename `creator` to `createdBy` ([9be54cc](https://www.github.com/lilboards/lilboards/commit/9be54ccbad02d1bd8eceb2813f9b0d8fd507be8b))
- rename `updated` to `updatedAt` ([4aa7a81](https://www.github.com/lilboards/lilboards/commit/4aa7a8185b64787ec60711f4001ecfc9f49c3917))

## [2.17.0](https://www.github.com/lilboards/lilboards/compare/v2.16.0...v2.17.0) (2021-07-05)

### Features

- **components:** make column name readonly if user cannot edit ([ed9f6f1](https://www.github.com/lilboards/lilboards/commit/ed9f6f1a36d73f7635877f32fc003b7178448f50))
- **components:** remove add column button if user cannot edit ([9d30b53](https://www.github.com/lilboards/lilboards/commit/9d30b539900b083c5af3fc4fae2ad74ab3beeb4b))

## [2.16.0](https://www.github.com/lilboards/lilboards/compare/v2.15.0...v2.16.0) (2021-07-04)

### Features

- save board creator userId ([5e98c7f](https://www.github.com/lilboards/lilboards/commit/5e98c7fae7bbeec81fb8dc6d9435c381b3120b2c))

## [2.15.0](https://www.github.com/lilboards/lilboards/compare/v2.14.1...v2.15.0) (2021-07-04)

### Features

- **components:** add sort by likes button to BoardControls ([35e84c2](https://www.github.com/lilboards/lilboards/commit/35e84c271ca3bab5e9034c5ed083ec373295060b))
- **components:** sort column items by likes in BoardControls ([fe972c3](https://www.github.com/lilboards/lilboards/commit/fe972c34fde3f03128ae194ca105b6d9ae7fbf7b))

## [2.14.1](https://www.github.com/lilboards/lilboards/compare/v2.14.0...v2.14.1) (2021-07-03)

### Bug Fixes

- **components:** return valid falsey value for getBackgroundColor ([782b83e](https://www.github.com/lilboards/lilboards/commit/782b83e861f7aab90d894e18df5f7e88e7d24eb5))
- **components:** update Column Grid to have auto-layout ([37ef6b0](https://www.github.com/lilboards/lilboards/commit/37ef6b03d03ffb83225d0e4f302b83d22b2503b6))

## [2.14.0](https://www.github.com/lilboards/lilboards/compare/v2.13.2...v2.14.0) (2021-07-03)

### Features

- **components:** combine items with drag and drop ([b84ed90](https://www.github.com/lilboards/lilboards/commit/b84ed9019141b025964339d7de168252200c5dfa))

## [2.13.2](https://www.github.com/lilboards/lilboards/compare/v2.13.1...v2.13.2) (2021-07-03)

### Performance Improvements

- **components:** memoize Droppable children to avoid re-render ([1643d15](https://www.github.com/lilboards/lilboards/commit/1643d155e8aa6313a4a12547e7c1e0ce55c4f605))

## [2.13.1](https://www.github.com/lilboards/lilboards/compare/v2.13.0...v2.13.1) (2021-07-02)

### Performance Improvements

- **firebase:** use transaction to save itemIds of columns ([5feebe0](https://www.github.com/lilboards/lilboards/commit/5feebe072e216e4bab24cee7433d559240c9a36b))

## [2.13.0](https://www.github.com/lilboards/lilboards/compare/v2.12.0...v2.13.0) (2021-07-02)

### Features

- **components:** move item from one column to another in reorder ([6e5c104](https://www.github.com/lilboards/lilboards/commit/6e5c104804c62b79af62f69ba18d75b33c3f1923))

## [2.12.0](https://www.github.com/lilboards/lilboards/compare/v2.11.0...v2.12.0) (2021-07-02)

### Features

- **components:** create reorderColumns helper ([ff9b725](https://www.github.com/lilboards/lilboards/commit/ff9b725610f76028f45a2a26db773551ef71b160))
- **components:** create reorderItems helper ([9c06a61](https://www.github.com/lilboards/lilboards/commit/9c06a61ba2681cc1ddf692c9a0b1e1215c1e32c7))
- **components:** reorder items on drag end in DragDropContainer ([88c715d](https://www.github.com/lilboards/lilboards/commit/88c715dd93dff2efa968abd0dc1b7590d50c9942))
- **store:** add columnsSlice reducer setColumnItemIds ([b0e8d09](https://www.github.com/lilboards/lilboards/commit/b0e8d09093265e10bb7b77e7f5b87cd3845467d0))

## [2.11.0](https://www.github.com/lilboards/lilboards/compare/v2.10.0...v2.11.0) (2021-07-02)

### Features

- **components:** add drag and drop to Board and Items ([bac80bf](https://www.github.com/lilboards/lilboards/commit/bac80bf736ebf2c9d3e1f76971ad13c324b7b782))

## [2.10.0](https://www.github.com/lilboards/lilboards/compare/v2.9.0...v2.10.0) (2021-07-01)

### Features

- **components:** add link to boards in Header ([a0583c9](https://www.github.com/lilboards/lilboards/commit/a0583c954f154bfe25c9fdc5eb8eaee9142c7320))

## [2.9.0](https://www.github.com/lilboards/lilboards/compare/v2.8.5...v2.9.0) (2021-06-30)

### Features

- **components:** raise BoardCard on focus or edit ([4f96558](https://www.github.com/lilboards/lilboards/commit/4f9655892fdddfe494080e45dd807ce77650e07f))
- **components:** raise Item Card on focus or edit ([087d9f7](https://www.github.com/lilboards/lilboards/commit/087d9f7a19eff3e7a5a087b808aa1c265dce09a4))

## [2.8.5](https://www.github.com/lilboards/lilboards/compare/v2.8.4...v2.8.5) (2021-06-30)

### Bug Fixes

- **components:** add useAuth in Board so user signs in anonymously ([53dbc3f](https://www.github.com/lilboards/lilboards/commit/53dbc3f4f2f30bda6e3092c73cac00a55266e4ad))

## [2.8.4](https://www.github.com/lilboards/lilboards/compare/v2.8.3...v2.8.4) (2021-06-30)

### Bug Fixes

- **components:** prevent race condition with firebase in Logout ([9ac436c](https://www.github.com/lilboards/lilboards/commit/9ac436c10f348ace81dc141689007e8d63507e34))

## [2.8.3](https://www.github.com/lilboards/lilboards/compare/v2.8.2...v2.8.3) (2021-06-30)

### Bug Fixes

- **components:** check user is logged in with email in ProtectedRoute ([88e61a6](https://www.github.com/lilboards/lilboards/commit/88e61a61721870e4e8b3748db11b979bedf48755))

## [2.8.2](https://www.github.com/lilboards/lilboards/compare/v2.8.1...v2.8.2) (2021-06-30)

### Bug Fixes

- **components:** check user is logged in with email in Header ([df5a265](https://www.github.com/lilboards/lilboards/commit/df5a2650143fc5b2b94139df1c03d210c13e829b))

## [2.8.1](https://www.github.com/lilboards/lilboards/compare/v2.8.0...v2.8.1) (2021-06-30)

### Performance Improvements

- do not import firebase in Login uiConfig ([c704d7a](https://www.github.com/lilboards/lilboards/commit/c704d7af4ce58a8e88e3e53df0c3634d29751d22))

## [2.8.0](https://www.github.com/lilboards/lilboards/compare/v2.7.0...v2.8.0) (2021-06-30)

### Features

- **components:** add Likes ([7b4404b](https://www.github.com/lilboards/lilboards/commit/7b4404bcba6fdda26eba79e4a16f5764da86ae3c))
- **components:** render Likes in Item ([14aa223](https://www.github.com/lilboards/lilboards/commit/14aa223cc29648ae357c1b11ec04ebf67a8b977a))
- **components:** toggle like and unlike with on click in Likes ([780e324](https://www.github.com/lilboards/lilboards/commit/780e3244d34b13916c7470ecf2b93970a651b6ff))
- **firebase:** add database helpers `likeItem` and `unlikeItem` ([99dc0e9](https://www.github.com/lilboards/lilboards/commit/99dc0e9c3cec23efe18d35abb5522f0c1df56e6e))
- **store:** add likes to itemsSlice ([1807753](https://www.github.com/lilboards/lilboards/commit/1807753cc4db877bc2e0c8387d252bdaf8d5be71))
- **store:** add reducers `likeItem` and `unlikeItem` to itemsSlice ([7f0dfc2](https://www.github.com/lilboards/lilboards/commit/7f0dfc25f29d880059f88301f402344c59c92a37))

## [2.7.0](https://www.github.com/lilboards/lilboards/compare/v2.6.1...v2.7.0) (2021-06-29)

### Features

- **components:** add focus and blur to Item ([b8d52e5](https://www.github.com/lilboards/lilboards/commit/b8d52e58e5abb0c8a03ac16028b887e36d10dada))
- **components:** focus on newly added item in Items ([d35028f](https://www.github.com/lilboards/lilboards/commit/d35028f8d8a0409ddc28164ebb913d14e94b7bb1))
- **components:** update item on change ([2570042](https://www.github.com/lilboards/lilboards/commit/2570042ef3e50a0114c131a89d4e98e25dab0ade))

## [2.6.1](https://www.github.com/lilboards/lilboards/compare/v2.6.0...v2.6.1) (2021-06-29)

### Bug Fixes

- remove correct board ref in database when board is deleted ([04ef55f](https://www.github.com/lilboards/lilboards/commit/04ef55f756357b3e58a33689e0fdb59859af2fb1))

## [2.6.0](https://www.github.com/lilboards/lilboards/compare/v2.5.0...v2.6.0) (2021-06-29)

### Features

- **components:** listen to items ref value in Columns ([1e87f3a](https://www.github.com/lilboards/lilboards/commit/1e87f3a7569b4b2a103660c2cb0a1438e882a9aa))
- **components:** replace item placeholder with item from store ([a8e137d](https://www.github.com/lilboards/lilboards/commit/a8e137da15fa5e776762a36d80a6199baf3a6470))

## [2.5.0](https://www.github.com/lilboards/lilboards/compare/v2.4.4...v2.5.0) (2021-06-29)

### Features

- **components:** add delete item button to Item ([7e19650](https://www.github.com/lilboards/lilboards/commit/7e19650ebd7b4eb4978f450e151fc45894687ad2))
- **firebase:** add `setColumnItemIds` to database ([46f4989](https://www.github.com/lilboards/lilboards/commit/46f4989c517232f63f2229053d293d7b3b646903))
- **store:** add reducer `loadItems` to itemsSlice ([26e7c07](https://www.github.com/lilboards/lilboards/commit/26e7c077a606359c88a1cc992921d0d631404639))
- **store:** add reducer `removeColumnItemId` to columnsSlice ([7c0007c](https://www.github.com/lilboards/lilboards/commit/7c0007cb019ef431df1ab1e7c7703f77c9d93f1d))
- **store:** add reducer `removeItem` to itemsSlice ([fd62ab5](https://www.github.com/lilboards/lilboards/commit/fd62ab5e8f8268f5cd5183c0c275666ded531f8e))

### Bug Fixes

- **components:** show placeholder item cards ([116f805](https://www.github.com/lilboards/lilboards/commit/116f8052893188c6ca0744aad1fa2b2aec46e677))
- **store:** don't throw error when columnsSlice itemIds is undefined ([0b38bb2](https://www.github.com/lilboards/lilboards/commit/0b38bb266982bf0b395e7f081936e3f150ecffe0))

## [2.4.4](https://www.github.com/lilboards/lilboards/compare/v2.4.3...v2.4.4) (2021-06-28)

### Bug Fixes

- remove items when column is deleted ([89b5b04](https://www.github.com/lilboards/lilboards/commit/89b5b04604c4d2dee253430caec79671727bd263))

## [2.4.3](https://www.github.com/lilboards/lilboards/compare/v2.4.2...v2.4.3) (2021-06-28)

### Bug Fixes

- **components:** autofocus on newly added column ([5ffebd9](https://www.github.com/lilboards/lilboards/commit/5ffebd9217a5ca4123e323d09758dc8566b84f77))
- **components:** reset user editing columnId on blur ([cde9adb](https://www.github.com/lilboards/lilboards/commit/cde9adb1bea98eb2e4b1b296972ef5987c17a285))

## [2.4.2](https://www.github.com/lilboards/lilboards/compare/v2.4.1...v2.4.2) (2021-06-28)

### Performance Improvements

- **firebase:** debounce edit column update database ([1e94142](https://www.github.com/lilboards/lilboards/commit/1e94142136b3dfc1c4cb13a7fb1d97a8178f0e87))

## [2.4.1](https://www.github.com/lilboards/lilboards/compare/v2.4.0...v2.4.1) (2021-06-28)

### Performance Improvements

- **hooks:** use `shallowEqual` as the `equalityFn` in `useSelector` ([25c838a](https://www.github.com/lilboards/lilboards/commit/25c838a9dd213a1e2e43afad75fa2e511f3d4fa0))

## [2.4.0](https://www.github.com/lilboards/lilboards/compare/v2.3.0...v2.4.0) (2021-06-27)

### Features

- debounce save board to database on change instead of on blur ([f6ff028](https://www.github.com/lilboards/lilboards/commit/f6ff028b4019a4158276a0575b0d2c143fc3f7f6))

## [2.3.0](https://www.github.com/lilboards/lilboards/compare/v2.2.0...v2.3.0) (2021-06-27)

### Features

- save board to firebase database on blur ([08f2c81](https://www.github.com/lilboards/lilboards/commit/08f2c818fc31e7210dd52b7476f1fd4dfc7e9a39))

### Bug Fixes

- **components:** reset user editing board id on blur ([6c55307](https://www.github.com/lilboards/lilboards/commit/6c553076ef56c1cb24590af22ba6417b8015335a))

## [2.2.0](https://www.github.com/lilboards/lilboards/compare/v2.1.0...v2.2.0) (2021-06-23)

### Features

- **components:** add Item that renders a blank Card ([b04a013](https://www.github.com/lilboards/lilboards/commit/b04a0138619b5b5fd45df84eae8275c81ed5a9e5))
- **components:** append itemId to columns store in addItem ([2e16a3e](https://www.github.com/lilboards/lilboards/commit/2e16a3ebd553d5c28ca8cae4633728b30b5ceac1))
- **components:** render Item when it's added in Items ([9b5c462](https://www.github.com/lilboards/lilboards/commit/9b5c462d787f7653c84075a857b6da7342b3267b))

### Bug Fixes

- **components:** render the column items ([6572b99](https://www.github.com/lilboards/lilboards/commit/6572b9916add88a7cf981e52d10afb164709c6f9))

## [2.1.0](https://www.github.com/lilboards/lilboards/compare/v2.0.0...v2.1.0) (2021-06-22)

### Features

- **components:** add Items which renders "Add item" button ([158dfab](https://www.github.com/lilboards/lilboards/commit/158dfabf8994a4fbfabec442b2f7f014bc068126))
- **components:** render Items in Columns and stylize column ([bd2f026](https://www.github.com/lilboards/lilboards/commit/bd2f026992f4cfed737cad99fa606e7ce6cdc075))

## [2.0.0](https://www.github.com/lilboards/lilboards/compare/v1.13.1...v2.0.0) (2021-06-21)

### ⚠ BREAKING CHANGES

- board data is saved in ref "boards/:id/board"

### Features

- change location of where board data is saved in database ([2d960ca](https://www.github.com/lilboards/lilboards/commit/2d960cace1484c2a8b0f6a14de08ed84face62c5))

### Bug Fixes

- use correct database ref so board can be edited and deleted ([1692ca4](https://www.github.com/lilboards/lilboards/commit/1692ca4079f73df7b773011219c1f637c369c10f))

## [1.13.1](https://www.github.com/lilboards/lilboards/compare/v1.13.0...v1.13.1) (2021-06-21)

### Bug Fixes

- **components:** don't dispatch action loadBoard for empty payload ([f3af015](https://www.github.com/lilboards/lilboards/commit/f3af0151bd828bdbd3e5092ee4f2e6c904bc784f))

## [1.13.0](https://www.github.com/lilboards/lilboards/compare/v1.12.0...v1.13.0) (2021-06-20)

### Features

- **components:** make column into an editable input in Columns ([a8b77ab](https://www.github.com/lilboards/lilboards/commit/a8b77ab5120eb72e176c175e18a938e214222e3f))
- **store:** add editColumn reducer to columnsSlice ([495e50f](https://www.github.com/lilboards/lilboards/commit/495e50fc143caa0e37c1739502542bf9ce26bc19))

## [1.12.0](https://www.github.com/lilboards/lilboards/compare/v1.11.0...v1.12.0) (2021-06-20)

### Features

- **components:** add delete column button to Columns ([befb96c](https://www.github.com/lilboards/lilboards/commit/befb96cab9da1296d55fb56e807a0bee110ef249))
- **firebase:** add getColumnRef to database ([5170a1b](https://www.github.com/lilboards/lilboards/commit/5170a1b3f07088e9f0fb0196cd4f5d9d2536b6c7))
- **store:** add deleteColumn reducer to columnsSlice ([e6b19cb](https://www.github.com/lilboards/lilboards/commit/e6b19cb4466d524b4f86aaf8c41063a17ff75f90))

## [1.11.0](https://www.github.com/lilboards/lilboards/compare/v1.10.0...v1.11.0) (2021-06-20)

### Features

- **components:** add CloseButton ([96d5f05](https://www.github.com/lilboards/lilboards/commit/96d5f05ca4e786c29dd5ebf8602a63e0e7a46288))

## [1.10.0](https://www.github.com/lilboards/lilboards/compare/v1.9.0...v1.10.0) (2021-06-15)

### Features

- **firebase:** add getBoardRef in database ([b8150d9](https://www.github.com/lilboards/lilboards/commit/b8150d9127421ddfbb7938f832725e5c152f989d))
- **firebase:** add getBoardVal to database ([0e5a335](https://www.github.com/lilboards/lilboards/commit/0e5a3353aeeca0ab06e58a924199bd84847321d6))
- **firebase:** add getColumnsRef in database ([9282609](https://www.github.com/lilboards/lilboards/commit/92826093a4380131455e6515d4768437fdde0e61))
- **firebase:** add getUserRef and getUserBoardsVal to database ([20b4a7d](https://www.github.com/lilboards/lilboards/commit/20b4a7df918e26591e998ec88d7396e2ccffdba4))

## [1.9.0](https://www.github.com/lilboards/lilboards/compare/v1.8.1...v1.9.0) (2021-06-12)

### Features

- **actions:** add columnsSlice actions ([c4a9dcd](https://www.github.com/lilboards/lilboards/commit/c4a9dcdaeb078c24be2af59e6651b8b473e6d221))
- **components:** add column when button is clicked in Board ([30eb881](https://www.github.com/lilboards/lilboards/commit/30eb88120c3161c32b2545a5c5ce2b2def6fb259))
- **components:** add Columns ([a89d72f](https://www.github.com/lilboards/lilboards/commit/a89d72f6982a01472b71cb0379722cb34fc42d53))
- **components:** render "Add column" button in Board ([e9d4996](https://www.github.com/lilboards/lilboards/commit/e9d4996a3d4edf48fe42a40bd1d18e32956d568b))
- **components:** render Columns in Board ([d442af1](https://www.github.com/lilboards/lilboards/commit/d442af1372c5843823d986fd7e2eb4389fd83d3a))
- **store:** add columnsSlice ([013b9b7](https://www.github.com/lilboards/lilboards/commit/013b9b72b996c0f710d102e2949963c1b7935ad6))
- **store:** add columnsSlice reducer to store ([270b063](https://www.github.com/lilboards/lilboards/commit/270b0634f1ca4f639da601c9b9b6b51e10633b62))
- **store:** add reducer `loadColumns` to columnsSlice ([e1c8690](https://www.github.com/lilboards/lilboards/commit/e1c8690a6ceca9d3ec50f4305efbf7342d17fa90))

### Bug Fixes

- **components:** remove columns from store state on unmount ([818beb0](https://www.github.com/lilboards/lilboards/commit/818beb0275f61169559a51797b375bae9c0d04fc))

## [1.8.1](https://www.github.com/lilboards/lilboards/compare/v1.8.0...v1.8.1) (2021-06-09)

### Bug Fixes

- **components:** do not make Board a ProtectedRoute ([6485135](https://www.github.com/lilboards/lilboards/commit/6485135db96e124a80c5e9c7a209ce9f76fc155b))
- **components:** redirect not found board to 404 page ([5734fa4](https://www.github.com/lilboards/lilboards/commit/5734fa4b5c3f426ce5d12913ff9ed2c07abbeb1b))

### Performance Improvements

- **components:** skip effect hook when board exists ([f10fc82](https://www.github.com/lilboards/lilboards/commit/f10fc827f68bdb85c29fd2382e2767620a6b1508))

## [1.8.0](https://www.github.com/lilboards/lilboards/compare/v1.7.1...v1.8.0) (2021-06-09)

### Features

- **components:** replace board placeholder with name ([da4aac0](https://www.github.com/lilboards/lilboards/commit/da4aac0f6e59b5ca210c483f92a4ccdaa82bd504))

## [1.7.1](https://www.github.com/lilboards/lilboards/compare/v1.7.0...v1.7.1) (2021-06-09)

### Bug Fixes

- **store:** ignore undefined board id in `loadBoard` ([84c9d66](https://www.github.com/lilboards/lilboards/commit/84c9d6645f4c1f2657019ecefaf53b6ce91c5656))

## [1.7.0](https://www.github.com/lilboards/lilboards/compare/v1.6.0...v1.7.0) (2021-06-09)

### Features

- save `created` and `updated` timestamp for board ([3a11513](https://www.github.com/lilboards/lilboards/commit/3a11513efe2704e7fd7d326f0bc57934edc23afb))

## [1.6.0](https://www.github.com/lilboards/lilboards/compare/v1.5.0...v1.6.0) (2021-06-08)

### Features

- **actions:** consolidate boards actions ([2200550](https://www.github.com/lilboards/lilboards/commit/2200550de8ded43374d03df6144f38c34694de56))
- **component:** allow board name to be edited ([6a841e5](https://www.github.com/lilboards/lilboards/commit/6a841e53599b682f07f615569d08d519dd00c048))
- **components:** add and render boards ([b5bdd49](https://www.github.com/lilboards/lilboards/commit/b5bdd49030ebcfe21b612efd0945fff593e6ce3e))
- **components:** add Board ([ffcebdc](https://www.github.com/lilboards/lilboards/commit/ffcebdca1a06946ebfb9f2d4ca11c8aeeffc6d2a))
- **components:** add Board to Routes ([37fde90](https://www.github.com/lilboards/lilboards/commit/37fde9049aa53cf1d2b535cc5fb21748c3efe176))
- **components:** add create board button ([5dc2799](https://www.github.com/lilboards/lilboards/commit/5dc2799755844073ed9fdbfa9ce7a2ef1e2098c5))
- **components:** add link to board in Boards ([f984754](https://www.github.com/lilboards/lilboards/commit/f9847542ae1cb3362eb9bebba747324f42644fdf))
- **components:** allow board to be deleted ([8fbebf5](https://www.github.com/lilboards/lilboards/commit/8fbebf5a6a4861b70472857722cb10bc6be718d0))
- **components:** autofocus new board input ([3d2cb8a](https://www.github.com/lilboards/lilboards/commit/3d2cb8a1b8ae93564dfa0c746bfd263098f2d27c))
- **components:** load boards on mount ([328ae18](https://www.github.com/lilboards/lilboards/commit/328ae18cdc308293354af72970d7f83f6800fdf5))
- **components:** stylize copy as heading in Boards ([3b150c3](https://www.github.com/lilboards/lilboards/commit/3b150c37006d930c732c32a1127a0ae949c101f6))
- **firebase:** export database ref 'boards' ([0f8539e](https://www.github.com/lilboards/lilboards/commit/0f8539e7211d73f92af6a008151e8481ca155cbf))
- **firebase:** export usersRef from database ([7c66233](https://www.github.com/lilboards/lilboards/commit/7c66233897ee153a5e7543fc9717a199b3ba81e2))
- load boards owned by the user ([0259176](https://www.github.com/lilboards/lilboards/commit/0259176f16929ab39eeee902dc863d5575c80d16))
- remove board id from users ref when board is deleted ([c8cf76f](https://www.github.com/lilboards/lilboards/commit/c8cf76f386a01de0d9e158d45321fb8cb344552a))
- save board id to users ref ([b7e8bf6](https://www.github.com/lilboards/lilboards/commit/b7e8bf62a5989995a43b5da4af86b87cb07357cc))
- **store:** add `deleteBoard` reducer to boardsSlice ([11e962c](https://www.github.com/lilboards/lilboards/commit/11e962caec147d38e2e15e309e465f3ee45437a8))
- **store:** add boards slice reducer to store ([f2fc3e1](https://www.github.com/lilboards/lilboards/commit/f2fc3e1a074b7597801306fb3441f77b30819b84))
- **store:** add boardsSlice ([9d9a3e6](https://www.github.com/lilboards/lilboards/commit/9d9a3e6f5ddcc92157ee711ec6134056900c5362))
- **store:** add optional board property `focus` ([a1d0d6d](https://www.github.com/lilboards/lilboards/commit/a1d0d6d33b6d58c000994c9aadb93d6ab233bdbd))
- **store:** add reducer `loadBoards` to boardsSlice ([5851a6f](https://www.github.com/lilboards/lilboards/commit/5851a6f6d189f79b8a19d915bdeab11608c5b529))
- **store:** remove board from boardsRef in `deleteBoard` ([6855b2a](https://www.github.com/lilboards/lilboards/commit/6855b2a4bd48a04445780bd2d6d9a511c89b538f))
- **store:** save name when editing board ([ac61a02](https://www.github.com/lilboards/lilboards/commit/ac61a024249aa03512cf651ddb39f7ae5df02177))
- **store:** save new board to firebase database ([2a6af37](https://www.github.com/lilboards/lilboards/commit/2a6af37768c99ae30d4008139d82a0a744d3ed17))
- **store:** update reducers in boardSlice ([6bc6325](https://www.github.com/lilboards/lilboards/commit/6bc6325d9cb7c279ca062010e424d4a6f77aa3a3))
- update Login to save user email to store ([45b19e3](https://www.github.com/lilboards/lilboards/commit/45b19e30c7f1981d66dcea337d57a17d9d2127fe))

### Bug Fixes

- **components:** ensure aria-label is unique in Boards ([7eb3b18](https://www.github.com/lilboards/lilboards/commit/7eb3b185d1e6fc37e7437a9de0bf51dd66f978f3))
- **components:** skip dispatch `loadBoards` if snapshot is null ([1b924fb](https://www.github.com/lilboards/lilboards/commit/1b924fb5535683274575c86f121fd48570ee7c5f))
- reset store on Logout ([11a3ba6](https://www.github.com/lilboards/lilboards/commit/11a3ba65b2c8b6ea4e55813cf213ece4140e6b2a))
- **store:** skip `loadBoards` if payload is null ([5d21466](https://www.github.com/lilboards/lilboards/commit/5d21466cf75a12ded101521868247955caa4e413))

### Performance Improvements

- remove redundant board id in store ([c74fceb](https://www.github.com/lilboards/lilboards/commit/c74fceb6b9cb1e7a53f99bc6535383e335bce121))
- **store:** optimize payload update when board is edited ([8e447ab](https://www.github.com/lilboards/lilboards/commit/8e447abe2b1d7f5e6d623062230da024c12f122b))

## [1.5.0](https://www.github.com/lilboards/lilboards/compare/v1.4.0...v1.5.0) (2021-06-06)

### Features

- **components:** add ProtectedRoute ([353e27f](https://www.github.com/lilboards/lilboards/commit/353e27f87e6cf1b37ec6dea8901cd5abcec7dab1))
- **components:** make Boards a ProtectedRoute ([c50ef70](https://www.github.com/lilboards/lilboards/commit/c50ef704d6c1097b0140fbb9015ce8e43f05e626))
- **components:** redirect to Boards when user is signed in ([88d29e2](https://www.github.com/lilboards/lilboards/commit/88d29e278f0fe41aad7e0fcfbe18bb3350a7f30b))

## [1.4.0](https://www.github.com/lilboards/lilboards/compare/v1.3.0...v1.4.0) (2021-06-06)

### Features

- **components:** show Logout button in Header when user's signed in ([840c261](https://www.github.com/lilboards/lilboards/commit/840c261325d12abd2e968f93df775c4535d32a16))

## [1.3.0](https://www.github.com/lilboards/lilboards/compare/v1.2.0...v1.3.0) (2021-06-05)

### Features

- **components:** add Logout ([3e7c330](https://www.github.com/lilboards/lilboards/commit/3e7c330f9fffc6a69808e860f067288a809e80e2))
- **components:** render Login in Routes ([4a3412a](https://www.github.com/lilboards/lilboards/commit/4a3412acf855dcaf8200817832963a27e3675ed3))
- **slices:** add and use action `resetUser` ([eb8c951](https://www.github.com/lilboards/lilboards/commit/eb8c95172b9010f1d732793b571bcc2bd268d83c))
- **utils:** add `resetStore` test helper ([df22583](https://www.github.com/lilboards/lilboards/commit/df22583b30d9b8df0cc38c5ef9f3ff29d60b4db6))
- **utils:** add test helpers ([e75976a](https://www.github.com/lilboards/lilboards/commit/e75976ad0eeae739b3a2a594de3145960bcbe0f0))

## [1.2.0](https://www.github.com/lilboards/lilboards/compare/v1.1.0...v1.2.0) (2021-06-04)

### Features

- **components:** add NotFound ([0694958](https://www.github.com/lilboards/lilboards/commit/06949584d29b40ea5cf5a7a407f48e5b972afc37))
- **Routes:** render NotFound as default route ([fcc890c](https://www.github.com/lilboards/lilboards/commit/fcc890c8261255281fd3efbe6967aeafebcfd604))

## [1.1.0](https://www.github.com/lilboards/lilboards/compare/v1.0.1...v1.1.0) (2021-06-04)

### Features

- **hooks:** create useDispatch and useSelector ([1e8aab6](https://www.github.com/lilboards/lilboards/commit/1e8aab691e2ecbfcc35eb5713d1a7a118326302f))
- **Login:** increase size of heading ([e13aaa7](https://www.github.com/lilboards/lilboards/commit/e13aaa74638b3be67a8694d91c5c2a180e1ca6b6))
- render Provider in index ([2774f53](https://www.github.com/lilboards/lilboards/commit/2774f53e8ca207243305d45c6041c9f6b0274c17))
- **slices:** add userSlice ([e1277aa](https://www.github.com/lilboards/lilboards/commit/e1277aa8f7f4b7ed5ec9378711348cfdd80764f1))
- **store:** configure store ([eced73b](https://www.github.com/lilboards/lilboards/commit/eced73b42107b210f620258466fe6d696fd515e7))

## [1.0.1](https://www.github.com/lilboards/lilboards/compare/v1.0.0...v1.0.1) (2021-06-03)

### Bug Fixes

- **Login:** avoid redirect after sign-in ([9442cdc](https://www.github.com/lilboards/lilboards/commit/9442cdc36bfe9be70172ac44de10e63349e5bdf6))

## 1.0.0 (2021-06-03)

### Features

- add Login to Routes and update Header button link ([5ff0614](https://www.github.com/lilboards/lilboards/commit/5ff06147a5bf5c33d0c85a4b5bea199982763c8c))
- add Routes and render Home ([426d8f5](https://www.github.com/lilboards/lilboards/commit/426d8f5a68ef2f14edbad6aded58562309fe9a87))
- **boards:** add Boards ([bda4c9b](https://www.github.com/lilboards/lilboards/commit/bda4c9b12f815adc29ae3f2ba5af07712ac4c052))
- **common:** add Header with heading and button ([5568ca6](https://www.github.com/lilboards/lilboards/commit/5568ca608105fb1629a1c744da2a4ca7178391ee))
- **common:** style Header elements ([40af5b5](https://www.github.com/lilboards/lilboards/commit/40af5b52808b790dc7cb9327b3b91fb4f0d3830b))
- **config:** check env and host ([9e042c0](https://www.github.com/lilboards/lilboards/commit/9e042c0cec07236040e5bd929a0971a3de8f446a))
- delete boilerplate code from create-react-app ([79a367d](https://www.github.com/lilboards/lilboards/commit/79a367d57ed275da855ca1be80265db2c749ca47))
- **firebase:** export app, auth, and database ([7e5c72f](https://www.github.com/lilboards/lilboards/commit/7e5c72fcef4bb1e5ee4eaf5a45dc58c5374fc277))
- **firebase:** get reference to auth service ([b942870](https://www.github.com/lilboards/lilboards/commit/b942870e02845d9b74856120ed8182daed90979b))
- **firebase:** get reference to database service ([6bcdd53](https://www.github.com/lilboards/lilboards/commit/6bcdd534af2abb732a7daf80af60e320dd990666))
- **firebase:** initialize firebase app ([e7c87b2](https://www.github.com/lilboards/lilboards/commit/e7c87b2eb1816bc6487ec1a3dba106e821a3d994))
- **home:** move App to home ([ea9e27f](https://www.github.com/lilboards/lilboards/commit/ea9e27f5e7b736db5891168912de8b2510a29697))
- **home:** render Header in Home ([b7a7b10](https://www.github.com/lilboards/lilboards/commit/b7a7b10ebe2c114fb0de210c1aba8d8a2c547493))
- **home:** update copy ([75e8e73](https://www.github.com/lilboards/lilboards/commit/75e8e73d7794a27deece3902ec76f8dd3c4c2109))
- **index:** render material-ui CssBaseline ([9a3b632](https://www.github.com/lilboards/lilboards/commit/9a3b632c2e6cd641da462ecb1c11f56b20d8b4be))
- initialize project using Create React App ([508e705](https://www.github.com/lilboards/lilboards/commit/508e705f839996b9224e3b5953e48bd594177e60))
- **layout:** change heading to link in Header ([def06e8](https://www.github.com/lilboards/lilboards/commit/def06e800d2856cc749dfa94d53d98faa21da166))
- **layout:** double margin top and bottom in Layout ([48b2e6a](https://www.github.com/lilboards/lilboards/commit/48b2e6a5092cf7f161434ff8a397aa366a44a5cb))
- **login:** sign in with react-firebaseui ([6a1b34d](https://www.github.com/lilboards/lilboards/commit/6a1b34dece1cfc4607ff07b136d7b2ff80426c71))
- **login:** update sign in auth providers to only Google and email ([1670f9c](https://www.github.com/lilboards/lilboards/commit/1670f9c6bf22fe2885b45b44ffe75c813cf76d38))
- **public:** capitalize title and update description in index.html ([f1ce803](https://www.github.com/lilboards/lilboards/commit/f1ce803003d564defa3e8cea87e78b1eb97d4c84))
- **public:** load Roboto font and font icons in index.html ([737b0ac](https://www.github.com/lilboards/lilboards/commit/737b0ac44a41838b02586c7604679f2db8715278))
- **public:** update name and short_name in manifest.json ([f53d412](https://www.github.com/lilboards/lilboards/commit/f53d412ee7ef55e0784e428c7b39296a736a9a38))
- **public:** update title and description in index.html ([7c8daba](https://www.github.com/lilboards/lilboards/commit/7c8daba406954e3f9920b7fd8e5a9b6b21e1636e))
- **routes:** render Boards in Routes ([d45749a](https://www.github.com/lilboards/lilboards/commit/d45749a7ce874c3f057efca882a7a003e2ffb1f0))

### Bug Fixes

- **env:** set placeholder API key so local development app runs ([c40d524](https://www.github.com/lilboards/lilboards/commit/c40d524033598351f313de5f6d43222cebe86d70))
- **layout:** add margin top and bottom to children ([e052d3f](https://www.github.com/lilboards/lilboards/commit/e052d3f8f54f9761e661bfcfa726b8e99f5fa672))
- **layout:** render Container as main element ([f180f8c](https://www.github.com/lilboards/lilboards/commit/f180f8ce2fdc2e6ef31e6d8c6d81fee9b685e213))
- **layout:** wrap Header in Container so it's aligned with Layout ([7f328f1](https://www.github.com/lilboards/lilboards/commit/7f328f1c5e92015645c59a8e43bda47b1338a04b))
