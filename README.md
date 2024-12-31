# design-colors
<p>
  <a href="https://www.npmjs.com/package/@sdsjs/design-colors">
    <img src="https://img.shields.io/npm/v/@sdsjs/design-colors.svg">
  </a>
</p>

SCSS/Sass implementation for [Ant Design Colors](https://github.com/ant-design/ant-design-colors)

## Install

```shell
npm install @sdsjs/design-colors --save-dev
```

## Usage

```scss
@use '@sdsjs/design-colors' as designColors;

@debug designColors.$blue; // [#e6f1ff, #b5d4ff, #8cb8ff, #639aff, #3b79ff, #1355ff, #0439d9, #0027b3, #001a8c, #000f66]

@debug designColors.$blue-primary; // #1355ff
@debug designColors.$blue-1; // #e6f1ff
@debug designColors.$blue-dark; // [#11172c, #101d45, #14285b, #14317e, #133ead, #134bdc, #376fe8, #5f93f3, #88b3f8, #b2d0fa]
@debug designColors.$blue-dark-primary; // #134bdc
@debug designColors.$blue-dark-1; // #11172c
...
```

## Preset primary colors

```scss
(
  blue: #1355FF,
  red: #E50E15,
  green: #00B966,
  orange: #FB5D01,
  yellow: #EDA20D,
  purple: #9135DC,
  pink: #DE3692,
  cyan: #0BBEBE
)
```

### Override preset primary colors

```scss
// override blue primary color 
@use "@sdsjs/design-colors" as designColors with (
  $preset-primary-colors: (
    blue: #1355Fd,
  )
);
```

## Custom generate palettes 

```scss
@use '@sdsjs/design-colors' as designColors;
@debug designColors.generate(#0d91f3); // [#e6f8ff, #b0e7ff, #87d7ff, #5ec4ff, #36aeff, #0d91f3, #006dcc, #0053a6, #003c80, #002759]

// dark theme colors
// backgroundColor is optional, default value is #141414
@debug designColors.generate(#0d91f3, (theme: dark, backgroundColor: #141414)); // [#111d2a, #0f2a42, #123a57, #114c78, #0f65a5, #0e7ed2, #339fe8, #5abbf3, #84d1f8, #ade3fa]
```

