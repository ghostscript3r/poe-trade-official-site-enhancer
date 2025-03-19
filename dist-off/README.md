# Poe Trade Official Site Enhancer - [install link](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/poe-trade-official-site-enhancer.user.js)

Enhance your Path of Exile and Path of Exile 2 trading experience with powerful QoL features! An intuitive search save manager to save and load full searches or individual filter groups effortlessly. A new affix selector that dynamically displays only the mods available for the selected item type. Automatic sorting by real currency values (via poe.ninja) for better price comparisons. Quickly check gem max-quality costs and other useful enhancements. More features are on the way—if players find this useful, I'll keep expanding it!

## Features

### Item Search enhancements

* Sort item and currency searches by current chaos/exalted equivalent using **poe.ninja** for PoE1 and **orbwatch.trade** values for PoE2.
* Adds a save manager to easily save and reload any item search or even any filter group.
* Adds an affix selector based on [PoEDB](https://poedb.tw/)/[PoE2DB](https://poe2db.tw/) data to easily select all actually possible affixes for the item type you are searching.
* Duplicates search button on top of search controls.
* Result can be grouped by user selling
* For tiered items (essences, sextants...) show the cost of reaching max tier, also enabling sorting by this value.
* For gems show the cost of reaching max quality by buying the gem and the necessary gemcutter's prisms, also enabling sorting by this value.
* Wiki links for additional items and types.

## Please consider donating

**Enjoying the script? Buy me a beer! 🍻**  

I'm updating this now because I'm loving **Path of Exile 2** and want the best trading experience for myself.  
If you find it useful too, consider **tossing a coin my way**—it helps keep it working longer.  

That said, since there wasn’t much support in the past, I don’t expect to keep adding new features beyond what I personally need.  
But hey, if enough people start using it and showing support, who knows?  

No pressure—if you like it, you can **donate, spread the word, or just enjoy the script!** Cheers! 😃  

You can donate on [Patreon](https://www.patreon.com/bePatron?u=15819567) or [Paypal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L5JZS33ADMBQW) and support me directly.
You can also contribute simply by reccomending it to your friends, or even just by requesting new features or scripts.
Check my page on [Patreon](https://www.patreon.com/ghostscripter) or vote/propose new features here **[requesting new features for this project](https://www.tricider.com/admin/36HWcTk5RhZ/DawSV0oQX7b)**.

## Issue tracking

[GitHub issue tracking page](https://github.com/ghostscript3r/poe-trade-official-site-enhancer/issues)

> ### Use only GitHub please. The other repositories will be monitored occasionally at best. Also avoid sending bug report directly to my mail, there's a very high probability they'll just be ignored that way.

## Roadmap

<p>I’m glad to see so many people interested in this script! While I’ve kept the <strong>feature voting system</strong> and <strong>GitHub issue tracking</strong>, I’ll be honest—I haven’t been great at keeping up with requests in the past, and with limited support, that’s unlikely to change.</p><p>For now, I’ll keep working on this at my own pace, mostly adding things I personally find useful. I have some cool ideas, but they’re probably a bit too ambitious for a one-person side project.</p><p>That said, if you have suggestions, feel free to drop them in! Just know that new features will happen <strong>if and when I have the time and motivation.</strong> Either way, I appreciate everyone who’s found this useful!</p>

[New features request and vote](https://www.tricider.com/admin/36HWcTk5RhZ/DawSV0oQX7b)
[Project board](https://trello.com/b/x77l2HzX/poe-trade-enhancer)

### About Multi Live Search  

I know some people are wondering if **multi live search** will ever return. **Short answer: No.**  

It caused **server load issues**, which impacted the game itself, and honestly, it was mostly used for flipping—something this script wasn’t even designed for.  
You can still achieve the same result by opening multiple browser tabs, but you’ll quickly run into **IP limitations**, and the same would happen with multi live search.  

If there's real demand for this, the right approach would be **something like the old POE Sniper**, targeting the public official API for premium public tabs.  
If someone wants to take that on, I’d be happy to collaborate by helping **export searches in the right format**, but **multi live search won’t be coming from me again.**  

Hope that clears things up! 😊  


## Changelog & Releases

[GitHub Changelog](https://github.com/ghostscript3r/poe-trade-official-site-enhancer/releases)



## How to install

### Step 1: Install a ScriptManager

> #### Note: Right now it is tested with Tampermonkey on Chrome and Firefox. If need arises I'll test/debug on other browsers and ScriptManagers.
> #### Note: Greasemonkey 4+ not supported at the moment and unless some tools to help backward compatibility arise I'm pretty sure it will never be.

* ![firefox](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/firefox.png) Firefox: [Tampermonkey](https://www.tampermonkey.net/index.php?ext=dhdg&browser=firefox) - [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/)
* ![chrome](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/chrome.png) Chrome: [Tampermonkey](https://www.tampermonkey.net/index.php?ext=dhdg&browser=chrome)
* ![opera](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/opera.png) Opera: [Tampermonkey](https://www.tampermonkey.net/index.php?ext=dhdg&browser=opera) - [Violentmonkey](https://addons.opera.com/extensions/details/violent-monkey/)
* ![edge](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/msedge.png) Microsoft Edge: [Tampermonkey](https://www.tampermonkey.net/index.php?ext=dhdg&browser=edge)
* ![safari](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/safari.png) Safari: [Tampermonkey](https://www.tampermonkey.net/index.php?ext=dhdg&browser=safari) - [NinjaKit](https://github.com/os0x/NinjaKit)
* ![dolphin](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/dolphin.png) Dolphin: [Tampermonkey](https://www.tampermonkey.net/index.php?ext=dhdg&browser=dolphin)
* ![ucweb](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/ucweb.png) UC: [Tampermonkey](https://www.tampermonkey.net/index.php?ext=dhdg&browser=ucweb)

### Step 2: Install UserScript

> #### Note: If you are on *greasyfork.org* or *openuserjs.org* at the top of the you should see an "Install" button, and that's all you need. Else use any of the links below in your ScriptManager interface.

* [Install](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/poe-trade-official-site-enhancer.user.js) *from github.com*
* [Install](https://greasyfork.org/scripts/389702-poe-trade-official-site-enhancer/code/poe-trade-official-site-enhancer.user.js) *from greasyfork.org*
* [Install](https://openuserjs.org/install/ghostscript3r/poe-trade-official-site-enhancer.user.js) *from openuserjs.org*

### Step 3: Enjoy & Support Author

* Donate: [Patreon](https://www.patreon.com/bePatron?u=15819567) - [Paypal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L5JZS33ADMBQW)
* Rate It
* Share It (Social Network, Forums, Blogs, etc.)
* Request new features

## Repositories
* [GitHub](https://github.com/ghostscript3r/poe-trade-official-site-enhancer)
* [GreasyFork](https://greasyfork.org/scripts/389702-poe-trade-official-site-enhancer)
* [OpenUserJS](https://openuserjs.org/scripts/ghostscript3r/poe-trade-official-site-enhancer)


## About the author

> GhostScripter

I started making **Userscripts** (Tampermonkey/Greasemonkey) to fix little annoyances on websites I use daily.  
You know the feeling—when a site makes you click five times for something that should take one?  
As a web developer, realizing I could **just fix those frustrations** was a game-changer.  

My first scripts were rough but effective, and over time, I polished some and decided to share them.  
While this project hasn’t gained much traction, I still enjoy tweaking things and making life a little easier where I can.  

If there’s a site or web app that drives you nuts, feel free to suggest a script—I can’t promise I’ll take every request,  
but if it’s simple and interesting, who knows? Supporters do get a little extra consideration, but there are no guarantees—this  
is still a side project, and life tends to get in the way!  

For a list of published or planned projects, check out my **[Patreon page](https://www.patreon.com/ghostscripter)**.
## Poe Trade Official Site Enhancer Showcase

* Sort item and currency searches by current chaos/exalted equivalent using **poe.ninja** for PoE1 and **orbwatch.trade** values for PoE2.
![](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/sort-real-curr-off.gif)
* Adds a save manager to easily save and reload any item search or even any filter group.
![](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/save-man-off.gif)
* Adds an affix selector based on [PoEDB](https://poedb.tw/)/[PoE2DB](https://poe2db.tw/) data to easily select all actually possible affixes for the item type you are searching.
![](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/mod-selector.gif)
* Result can be grouped by user selling
![](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/group-same-user-off.gif)
* For tiered items (essences, sextants...) show the cost of reaching max tier, also enabling sorting by this value.
![](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/max-tier-off.gif)
* For gems show the cost of reaching max quality by buying the gem and the necessary gemcutter's prisms, also enabling sorting by this value.
![](https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/max-qt-off.gif)
