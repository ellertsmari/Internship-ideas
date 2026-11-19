# February is wide open

Ideas for the next internship project at Vefskólinn, starting February 2027.

**The site: https://ellertsmari.github.io/Internship-ideas/**

Everything is on the site: the ideas so far, and how to add your own.

## The short version

Everyone pushes straight to `main`. No branches, no pull requests, no approval.

```bash
git clone https://github.com/ellertsmari/Internship-ideas.git
cd Internship-ideas
```

Open `index.html`, search for `YOUR IDEA GOES ABOVE THIS LINE`, and paste a new card just above it. There is a template to copy right there in the file. Open `index.html` in your browser to see it. Nothing to install, nothing to build.

```bash
git add index.html
git commit -m "Add my idea"
git pull --rebase
git push
```

The site updates about a minute after you push.

Every idea has a research page behind it in `ideas/`, with findings, links, ways to build it and a first week. To make one for your own idea, copy `ideas/_template.html`, or use the ready-made prompt for an AI assistant under "Got one?" on the site.

The page itself is yours to change too: `index.html`, `style.css` and `script.js`.
