# no-lib
vue.js components library

## Add to your project
- Install with `git submodule add https://github.com/nepoxiii/no-lib.git the-path-you-want-to-put/no-lib`.  
- Add `no-style.css` path in your `nuxt.config.js`.  
Use like classic component you know.

## Change the colors
You can overwrite css and specially the variables use in `no-style.css` by create a new .css sheet.
Don't forget to put your style inside `.no-lib` class. Your file need to be placed below `no-style.css` in your `nuxt.config.js`.

Exemples of `your-style.css` :
```css
/*
 * change --bleu value
 */

.no-lib {
  var(--bleu): #MYBLUE;
}
```
```css
/*
 * change --bleu with your variable
 */

.no-lib {
  var(--bleu): --myblue;
}
```

🧙🧚‍♀️

[![](https://src.nepo.fr/illustration-0.jpg)](https://www.instagram.com/nepo_website)
