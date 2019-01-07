# FlexDown


### **Use markdown to create webpages!**

### [Official website](https://benjaminpoilve.github.io/FlexDownEditor/)

Flexdown is an extension of the [Markdown](https://daringfireball.net/projects/markdown/) syntax to allow some basic layout/responsivity. It automatically generate HTML code from a slightly extended Markdown file. 
The layout capabilities uses the [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox) CSS norm. The layout is akin to Bootstrap, with a small, medium and big size, which is defined per block by the user, using a `[big/medium/small]` syntax at the beginning of each block.
From a usage perspective, I borrowed @oscarmorrison 's idea (and some of it's implementation) to directly transform the Markdown file to html with a .js file in the user's browser. You can see this project [here](https://github.com/oscarmorrison/md-page)
This website has been made with it, with my custom CSS

### Usage

To use flexdown, you need to :

1. Create a file `index.html`

2. Add some basic Markdown

```
# The title

## The menu

![this is an image](https://source.png )

This is the first paragraph

```

3. Add some layouting informations (can't do it here because it would get interpreted)

4. Add the script tag at the top of the page `<script src="flexdown.js"></script><noscript>`

### Layout

The best way to understand is to look at the [demo website](https://benjaminpoilve.github.io/FlexDownEditor/)

### Caveats/Next Steps
- [ ] Code cleanup
- [ ] Issues
    - [ ] Syntax interpretation when in code block
- [ ] Enhancement
    - [ ] Emoji support limited
    - [ ] Modular CSS


    

