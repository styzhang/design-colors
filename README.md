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
@debug designColors.$red; // [#ffe9e6, #ffbab3, #ff928a, #ff6661, #f23535, #e50e15, #bf020f, #99000f, #73000f, #4d000d]
@debug designColors.$green; // [#e1faea, #98edbb, #6ce0a0, #44d489, #20c776, #00b966, #009456, #006e44, #00472e, #002117]
@debug designColors.$orange; // [#fff3e6, #ffd1a3, #ffb87a, #ff9d52, #ff7e29, #fb5d01, #d44700, #ad3400, #872400, #611700]
@debug designColors.$yellow; // [#fffbe6, #ffefb0, #ffe387, #ffd45e, #fabf34, #eda20d, #c77e00, #a16000, #7a4500, #542d00]
@debug designColors.$purple; // [#fbf0ff, #f5e0ff, #e6b8ff, #cc89f5, #ae5de8, #9135dc, #6e22b5, #4f148f, #340969, #1f0542]
@debug designColors.$pink; // [#fff0f6, #ffe0ed, #ffb8d8, #f78bbf, #eb5ea7, #de3692, #b8237a, #911461, #6b0a49, #450631]
@debug designColors.$cyan; // [#e6fffb, #aaf2e9, #7ce6db, #52d9d0, #2dccc7, #0bbebe, #029499, #006b73, #00454d, #002126]

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
  'blue': #1355FF,
  'red': #E50E15,
  'green': #00B966,
  'orange': #FB5D01,
  'yellow': #EDA20D,
  'purple': #9135DC,
  'pink': #DE3692,
  'cyan': #0BBEBE
)
```

### Override preset primary colors

```scss
// override blue primary color 
@use "@sdsjs/design-colors" as designColors with (
  $preset-primary-colors: (
    'blue': #0d91f3,
  )
);

@debug designColors.$blue; // [#e6f8ff, #b0e7ff, #87d7ff, #5ec4ff, #36aeff, #0d91f3, #006dcc, #0053a6, #003c80, #002759]
```

## Custom generate palettes 

```scss
@use '@sdsjs/design-colors' as designColors;
@debug designColors.generate(#0d91f3); // [#e6f8ff, #b0e7ff, #87d7ff, #5ec4ff, #36aeff, #0d91f3, #006dcc, #0053a6, #003c80, #002759]

// dark theme colors
// backgroundColor is optional, default value is #141414
@debug designColors.generate(#0d91f3, (theme: dark, backgroundColor: #141414)); // [#111d2a, #0f2a42, #123a57, #114c78, #0f65a5, #0e7ed2, #339fe8, #5abbf3, #84d1f8, #ade3fa]
```

