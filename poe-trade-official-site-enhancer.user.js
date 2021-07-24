// ==UserScript==
// @name         poe-trade-official-site-enhancer
// @namespace    https://github.com/ghostscript3r/poe-trade-enhancer
// @version      1.3.489
// @description  Adds tons of usefull features to poe.trade, from a very easy to use save manager to save and laod your searches and even live search them all in one page, to an auto sort by real currency values (from poe.ninja), passing from gems max quality cost and more. I have some other very good idea for features to add, I'll gladly push them forward if I see people start using this.
// @author       ghostscript3r@gmail.com | https://www.patreon.com/ghostscripter
// @license      MIT
// @match        https://www.pathofexile.com/trade*
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js
// @require      https://greasyfork.org/scripts/373124-gm4-polyfill-mach6-legacy/code/gm4-polyfill-mach6-legacy.js?version=635792
// @require      https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js
// @require      https://unpkg.com/popper.js@1.15.0/dist/umd/popper.min.js
// @require      https://unpkg.com/tippy.js@4.3.5/umd/index.all.min.js
// @require      https://code.jquery.com/jquery-1.11.3.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/async/3.1.0/async.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/js/bootstrap.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.2/bootstrap3-typeahead.min.js
// @resource     fontsCSS https://fonts.googleapis.com/css?family=Oswald|Roboto
// @resource     editableJs https://greasyfork.org/scripts/387585-jqueryeditable/code/jqueryeditable.js?version=717975
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// ==/UserScript==



(function() {
  'use strict';

  var namespace="ghost-scripter",ITEM_TYPES={Axe:["Abyssal Axe","Arming Axe","Boarding Axe","Broad Axe","Butcher Axe","Ceremonial Axe","Dagger Axe","Decorative Axe","Despot Axe","Double Axe","Ezomyte Axe","Gilded Axe","Headsman Axe","Infernal Axe","Jasper Axe","Karui Axe","Noble Axe","Reaver Axe","Royal Axe","Shadow Axe","Siege Axe","Spectral Axe","Stone Axe","Sundering Axe","Talon Axe","Timber Axe","Vaal Axe","Void Axe","War Axe","Wraith Axe"],Sceptre:["Abyssal Sceptre","Blood Sceptre","Bronze Sceptre","Carnal Sceptre","Crystal Sceptre","Darkwood Sceptre","Driftwood Sceptre","Horned Sceptre","Iron Sceptre","Karui Sceptre","Lead Sceptre","Ochre Sceptre","Opal Sceptre","Platinum Sceptre","Quartz Sceptre","Ritual Sceptre","Royal Sceptre","Sambar Sceptre","Shadow Sceptre","Stag Sceptre","Vaal Sceptre","Void Sceptre"],Amulet:["Agate Amulet","Amber Amulet","Blue Pearl Amulet","Citrine Amulet","Coral Amulet","Gold Amulet","Jade Amulet","Jet Amulet","Lapis Amulet","Marble Amulet","Onyx Amulet","Paua Amulet","Ruby Amulet","Turquoise Amulet"],Shield:["Alder Spiked Shield","Alloyed Spiked Shield","Ancient Spirit Shield","Angelic Kite Shield","Archon Kite Shield","Baroque Round Shield","Bone Spirit Shield","Branded Kite Shield","Brass Spirit Shield","Bronze Tower Shield","Buckskin Tower Shield","Burnished Spiked Shield","Cardinal Round Shield","Cedar Tower Shield","Ceremonial Kite Shield","Champion Kite Shield","Chiming Spirit Shield","Colossal Tower Shield","Compound Spiked Shield","Copper Tower Shield","Corroded Tower Shield","Crested Tower Shield","Crimson Round Shield","Driftwood Spiked Shield","Ebony Tower Shield","Elegant Round Shield","Etched Kite Shield","Ezomyte Spiked Shield","Ezomyte Tower Shield","Fir Round Shield","Fossilised Spirit Shield","Girded Tower Shield","Harmonic Spirit Shield","Ivory Spirit Shield","Jingling Spirit Shield","Lacewood Spirit Shield","Laminated Kite Shield","Layered Kite Shield","Linden Kite Shield","Mahogany Tower Shield","Maple Round Shield","Mirrored Spiked Shield","Mosaic Kite Shield","Ornate Spiked Shield","Painted Tower Shield","Pinnacle Tower Shield","Plank Kite Shield","Polished Spiked Shield","Rawhide Tower Shield","Redwood Spiked Shield","Reinforced Kite Shield","Reinforced Tower Shield","Rotted Round Shield","Scarlet Round Shield","Shagreen Tower Shield","Sovereign Spiked Shield","Spiked Round Shield","Spiny Round Shield","Splendid Round Shield","Splintered Tower Shield","Steel Kite Shield","Studded Round Shield","Supreme Spiked Shield","Tarnished Spirit Shield","Teak Round Shield","Thorium Spirit Shield","Titanium Spirit Shield","Twig Spirit Shield","Vaal Spirit Shield","Walnut Spirit Shield","Yew Spirit Shield"],Boots:["Ambush Boots","Assassin's Boots","Bronzescale Boots","Carnal Boots","Chain Boots","Clasped Boots","Conjurer Boots","Crusader Boots","Deerskin Boots","Dragonscale Boots","Eelskin Boots","Goathide Boots","Hydrascale Boots","Ironscale Boots","Leatherscale Boots","Legion Boots","Mesh Boots","Murder Boots","Nubuck Boots","Rawhide Boots","Ringmail Boots","Riveted Boots","Scholar Boots","Serpentscale Boots","Shackled Boots","Shagreen Boots","Sharkskin Boots","Slink Boots","Soldier Boots","Sorcerer Boots","Stealth Boots","Steelscale Boots","Strapped Boots","Trapper Boots","Two-Toned Boots","Wrapped Boots","Wyrmscale Boots","Zealot Boots"],Mitts:["Ambush Mitts","Assassin's Mitts","Carnal Mitts","Clasped Mitts","Murder Mitts","Strapped Mitts","Trapper Mitts","Wrapped Mitts"],Ambusher:["Ambusher"],Flask:["Amethyst Flask","Aquamarine Flask","Basalt Flask","Bismuth Flask","Colossal Hybrid Flask","Colossal Life Flask","Colossal Mana Flask","Diamond Flask","Divine Life Flask","Divine Mana Flask","Eternal Life Flask","Eternal Mana Flask","Giant Life Flask","Giant Mana Flask","Grand Life Flask","Grand Mana Flask","Granite Flask","Greater Life Flask","Greater Mana Flask","Hallowed Hybrid Flask","Hallowed Life Flask","Hallowed Mana Flask","Jade Flask","Large Hybrid Flask","Large Life Flask","Large Mana Flask","Medium Hybrid Flask","Medium Life Flask","Medium Mana Flask","Quartz Flask","Quicksilver Flask","Ruby Flask","Sacred Hybrid Flask","Sacred Life Flask","Sacred Mana Flask","Sanctified Life Flask","Sanctified Mana Flask","Sapphire Flask","Silver Flask","Small Hybrid Flask","Small Life Flask","Small Mana Flask","Stibnite Flask","Sulphur Flask","Topaz Flask"],Ring:["Amethyst Ring","Breach Ring","Coral Ring","Diamond Ring","Gold Ring","Iron Ring","Jet Ring","Moonstone Ring","Opal Ring","Paua Ring","Prismatic Ring","Ruby Ring","Sapphire Ring","Steel Ring","Topaz Ring","Two-Stone Ring","Unset Ring"],Club:["Ancestral Club","Barbed Club","Driftwood Club","Petrified Club","Spiked Club","Tribal Club"],Gauntlets:["Ancient Gauntlets","Antique Gauntlets","Bronze Gauntlets","Bronzescale Gauntlets","Dragonscale Gauntlets","Fishscale Gauntlets","Goliath Gauntlets","Hydrascale Gauntlets","Iron Gauntlets","Ironscale Gauntlets","Plated Gauntlets","Serpentscale Gauntlets","Steel Gauntlets","Steelscale Gauntlets","Titan Gauntlets","Vaal Gauntlets","Wyrmscale Gauntlets"],Greaves:["Ancient Greaves","Antique Greaves","Goliath Greaves","Iron Greaves","Kaom's Greaves","Plated Greaves","Reinforced Greaves","Steel Greaves","Titan Greaves","Vaal Greaves"],Sword:["Ancient Sword","Bastard Sword","Battle Sword","Broad Sword","Butcher Sword","Charan's Sword","Copper Sword","Corsair Sword","Courtesan Sword","Dragoon Sword","Elder Sword","Elegant Sword","Eternal Sword","Footman Sword","Gemstone Sword","Graceful Sword","Headman's Sword","Hook Sword","Infernal Sword","Legion Sword","Lion Sword","Ornate Sword","Reaver Sword","Rusted Sword","Spectral Sword","Tiger Sword","Two-Handed Sword","War Sword","Wraith Sword"],Rapier:["Antique Rapier","Apex Rapier","Basket Rapier","Dragonbone Rapier","Harpy Rapier","Primeval Rapier","Thorn Rapier","Vaal Rapier","Whalebone Rapier","Wyrmbone Rapier"],Gloves:["Arcanist Gloves","Chain Gloves","Conjurer Gloves","Crusader Gloves","Deerskin Gloves","Eelskin Gloves","Embroidered Gloves","Fingerless Silk Gloves","Goathide Gloves","Gripped Gloves","Legion Gloves","Mesh Gloves","Nubuck Gloves","Rawhide Gloves","Ringmail Gloves","Riveted Gloves","Samite Gloves","Satin Gloves","Shagreen Gloves","Sharkskin Gloves","Silk Gloves","Slink Gloves","Soldier Gloves","Sorcerer Gloves","Spiked Gloves","Stealth Gloves","Velvet Gloves","Wool Gloves","Zealot Gloves"],Slippers:["Arcanist Slippers","Avian Slippers","Samite Slippers","Satin Slippers","Silk Slippers","Velvet Slippers"],Plate:["Arena Plate","Astral Plate","Battle Plate","Bronze Plate","Colosseum Plate","Copper Plate","Crusader Plate","Full Plate","Gladiator Plate","Glorious Plate","Golden Plate","Kaom's Plate","Lordly Plate","Majestic Plate","Sun Plate","War Plate"],Talisman:["Ashscale Talisman","Avian Twins Talisman","Black Maw Talisman","Bonespire Talisman","Breakrib Talisman","Chrysalis Talisman","Clutching Talisman","Deadhand Talisman","Deep One Talisman","Fangjaw Talisman","Greatwolf Talisman","Hexclaw Talisman","Horned Talisman","Lone Antler Talisman","Longtooth Talisman","Mandible Talisman","Monkey Paw Talisman","Monkey Twins Talisman","Primal Skull Talisman","Rot Head Talisman","Rotfeather Talisman","Spinefuse Talisman","Splitnewt Talisman","Three Hands Talisman","Three Rat Talisman","Undying Flesh Talisman","Wereclaw Talisman","Writhing Talisman"],Bow:["Assassin Bow","Bone Bow","Citadel Bow","Composite Bow","Compound Bow","Crude Bow","Death Bow","Decimation Bow","Decurve Bow","Grove Bow","Harbinger Bow","Highborn Bow","Imperial Bow","Ivory Bow","Long Bow","Maraketh Bow","Ranger Bow","Recurve Bow","Reflex Bow","Royal Bow","Short Bow","Sniper Bow","Spine Bow","Steelwood Bow","Thicket Bow"],Garb:["Assassin's Garb","Cutthroat's Garb","Lacquered Garb","Sacrificial Garb","Sadist Garb","Silken Garb","Thief's Garb","Waxed Garb"],Mace:["Auric Mace","Behemoth Mace","Bladed Mace","Ceremonial Mace","Dragon Mace","Dream Mace","Flanged Mace","Nightmare Mace","Ornate Mace","Phantom Mace","Wyrm Mace"],Helmet:["Aventail Helmet","Barbute Helmet","Bone Helmet","Close Helmet","Cone Helmet","Crusader Helmet","Gladiator Helmet","Great Helmet","Lacquered Helmet","Reaver Helmet","Samite Helmet","Siege Helmet","Soldier Helmet","Zealot Helmet"],Awl:["Awl"],Baselard:["Baselard"],Foil:["Battered Foil","Burnished Foil","Elegant Foil","Fancy Foil","Jagged Foil","Jewelled Foil","Serrated Foil","Spiraled Foil","Tempered Foil"],Helm:["Battered Helm","Fencer Helm","Secutor Helm"],Buckler:["Battle Buckler","Corrugated Buckler","Crusader Buckler","Enameled Buckler","Gilded Buckler","Goathide Buckler","Golden Buckler","Hammered Buckler","Imperial Buckler","Ironwood Buckler","Lacquered Buckler","Oak Buckler","Painted Buckler","Pine Buckler","Vaal Buckler","War Buckler"],Hammer:["Battle Hammer","Legion Hammer","Stone Hammer","War Hammer"],Lamellar:["Battle Lamellar","Field Lamellar","Triumphant Lamellar"],Blinder:["Blinder"],Raiment:["Blood Raiment","Crimson Raiment","Scarlet Raiment"],Quiver:["Blunt Arrow Quiver","Broadhead Arrow Quiver","Conductive Quiver","Cured Quiver","Fire Arrow Quiver","Heavy Quiver","Light Quiver","Penetrating Arrow Quiver","Rugged Quiver","Serrated Arrow Quiver","Sharktooth Arrow Quiver","Spike-Point Arrow Quiver","Two-Point Arrow Quiver"],Armour:["Bone Armour","Carnal Armour","Crypt Armour","Full Scale Armour"],Circlet:["Bone Circlet","Hubris Circlet","Iron Circlet","Lunaris Circlet","Necromancer Circlet","Solaris Circlet","Steel Circlet","Tribal Circlet","Vine Circlet"],Blade:["Boot Blade","Corroded Blade","Curved Blade","Dusk Blade","Exquisite Blade","Ezomyte Blade","Highland Blade","Lithe Blade","Midnight Blade","Twilight Blade","Vaal Blade","Variscite Blade"],Knife:["Boot Knife","Butcher Knife","Carving Knife","Flaying Knife","Gutting Knife","Skinning Knife","Slaughter Knife"],Maul:["Brass Maul","Coronal Maul","Dread Maul","Driftwood Maul","Fright Maul","Imperial Maul","Jagged Maul","Karui Maul","Plated Maul","Solar Maul","Spiny Maul","Terror Maul","Totemic Maul","Tribal Maul"],Tunic:["Buckskin Tunic","Chainmail Tunic","Eelskin Tunic","Sharkskin Tunic"],Regalia:["Cabalist Regalia","Destroyer Regalia","Vaal Regalia"],Mask:["Callous Mask","Deicide Mask","Festival Mask","Golden Mask","Harlequin Mask","Iron Mask","Plague Mask","Raven Mask","Regicide Mask","Scare Mask","Vaal Mask"],Wand:["Carved Wand","Crystal Wand","Driftwood Wand","Engraved Wand","Heathen Wand","Imbued Wand","Omen Wand","Opal Wand","Pagan Wand","Profane Wand","Prophecy Wand","Quartz Wand","Sage Wand","Serpent Wand","Spiraled Wand","Tornado Wand"],Paw:["Cat's Paw","Hellion's Paw","Tiger's Paw"],Belt:["Chain Belt","Cloth Belt","Crystal Belt","Heavy Belt","Leather Belt","Studded Belt","Vanguard Belt"],Hauberk:["Chain Hauberk","Saint's Hauberk"],Doublet:["Chainmail Doublet","Dragonscale Doublet","Scale Doublet","Wyrmscale Doublet"],Vest:["Chainmail Vest","Oiled Vest","Padded Vest","Plate Vest","Scale Vest","Silken Vest"],Splitter:["Chest Splitter"],Chestplate:["Chestplate"],Cleaver:["Cleaver"],Jewel:["Cobalt Jewel","Crimson Jewel","Ghastly Eye Jewel","Hypnotic Eye Jewel","Murderous Eye Jewel","Prismatic Jewel","Searching Eye Jewel","Viridian Jewel"],Staff:["Coiled Staff","Crescent Staff","Eclipse Staff","Ezomyte Staff","Foul Staff","Highborn Staff","Imperial Staff","Iron Staff","Judgement Staff","Long Staff","Maelström Staff","Military Staff","Moon Staff","Primitive Staff","Primordial Staff","Royal Staff","Serpentine Staff","Vile Staff","Woodful Staff"],Mallet:["Colossus Mallet","Great Mallet","Mallet"],Brigandine:["Commander's Brigandine","Desert Brigandine","General's Brigandine","Hussar Brigandine","Infantry Brigandine","Light Brigandine","Soldier's Brigandine"],Vestment:["Conjurer's Vestment","Mage's Vestment","Occultist's Vestment"],Chainmail:["Conquest Chainmail","Crusader Chainmail","Devout Chainmail","Full Chainmail","Holy Chainmail","Saintly Chainmail"],Kris:["Copper Kris","Golden Kris","Platinum Kris"],Leather:["Coronal Leather","Destiny Leather","Exquisite Leather","Frontier Leather","Full Leather","Glorious Leather","Strapped Leather","Sun Leather","Wild Leather","Zodiac Leather"],Cutlass:["Cutlass"],Dagger:["Demon Dagger","Ezomyte Dagger","Fiend Dagger","Imp Dagger","Prong Dagger"],Horn:["Demon's Horn","Faun's Horn","Goat's Horn"],Claw:["Double Claw","Eagle Claw","Fright Claw","Gemini Claw","Great White Claw","Imperial Claw","Noble Claw","Prehistoric Claw","Sharktooth Claw","Sparkling Claw","Terror Claw","Thresher Claw","Timeworn Claw","Twin Claw","Vaal Claw"],Ringmail:["Elegant Ringmail","Full Ringmail","Latticed Ringmail","Loricated Ringmail","Ornate Ringmail"],Greatsword:["Engraved Greatsword","Etched Greatsword","Vaal Greatsword"],Hatchet:["Engraved Hatchet","Etched Hatchet","Jade Hatchet","Runic Hatchet","Rusted Hatchet","Vaal Hatchet"],Estoc:["Estoc"],Burgonet:["Eternal Burgonet","Ezomyte Burgonet","Royal Burgonet"],Gouger:["Eye Gouger","Gouger"],Rod:["Fishing Rod"],Fleshripper:["Fleshripper"],Bascinet:["Fluted Bascinet","Nightmare Bascinet","Pig-Faced Bascinet"],Dragonscale:["Full Dragonscale"],Wyrmscale:["Full Wyrmscale"],Gavel:["Gavel"],Sallet:["Gilded Sallet","Sallet","Visored Sallet"],Gladius:["Gladius"],Shank:["Glass Shank"],Branch:["Gnarled Branch"],Bracers:["Golden Bracers"],Caligae:["Golden Caligae"],Flame:["Golden Flame"],Hoop:["Golden Hoop"],Mantle:["Golden Mantle"],Obi:["Golden Obi"],Wreath:["Golden Wreath"],Grappler:["Grappler"],Crown:["Great Crown","Magistrate Crown","Praetor Crown","Prophet Crown"],Fetish:["Grinning Fetish"],Ripper:["Gut Ripper"],Hood:["Hunter Hood","Leather Hood","Silken Hood"],Skean:["Imperial Skean","Royal Skean","Skean"],Hat:["Iron Hat"],Chopper:["Jade Chopper","Jasper Chopper","Karui Chopper","Wrist Chopper"],Keyblade:["Keyblade"],Labrys:["Labrys"],Lathi:["Lathi"],Cap:["Leather Cap"],Pelt:["Lion Pelt","Ursine Pelt","Wolf Pelt"],Longsword:["Longsword"],Meatgrinder:["Meatgrinder"],Cage:["Mind Cage","Torture Cage"],Star:["Morning Star"],Fist:["Nailed Fist"],Silks:["Necromancer Silks"],Tricorne:["Noble Tricorne","Sinner Tricorne","Tricorne"],Coat:["Oiled Coat","Ringmail Coat","Sleek Coat","Varnished Coat"],Jacket:["Padded Jacket","Quilted Jacket","Sentinel Jacket"],Pecoraro:["Pecoraro"],Pernarch:["Pernarch"],Piledriver:["Piledriver"],Poignard:["Poignard"],Poleaxe:["Poleaxe"],Quarterstaff:["Quarterstaff"],Breaker:["Rock Breaker"],Coif:["Rusted Coif"],Spike:["Rusted Spike"],Sash:["Rustic Sash"],Sabre:["Sabre"],Robe:["Sage's Robe","Savant's Robe","Scholar's Robe","Silk Robe","Simple Robe","Spidersilk Robe","Widowsilk Robe"],Sai:["Sai"],Sekhem:["Sekhem","Tyrant's Sekhem"],Jerkin:["Shabby Jerkin"],Wrap:["Silken Wrap"],Sledgehammer:["Sledgehammer"],Smallsword:["Smallsword"],Bundle:["Spiked Bundle"],Steelhead:["Steelhead"],Stiletto:["Stiletto"],Vise:["Stygian Vise"],Tenderizer:["Tenderizer"],Stabber:["Throat Stabber"],Hook:["Tiger Hook"],Tomahawk:["Tomahawk"],Trisula:["Trisula"],Woodsplitter:["Woodsplitter"],Shoes:["Wool Shoes"]},FIXED_CURRENCY_VALUES=JSON.parse('{"lines":[{"currencyTypeName":"Mirror of Kalandra","pay":{"id":0,"league_id":1,"pay_currency_id":22,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":0.0000300679,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":22,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":21,"value":34056,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0,0,0,0,-0.23],"totalChange":-0.23},"receiveSparkLine":{"data":[0,0.28,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"chaosEquivalent":33657.03,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,-0.23],"totalChange":-0.23},"lowConfidenceReceiveSparkLine":{"data":[0,0.28,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"detailsId":"mirror-of-kalandra"},{"currencyTypeName":"Eternal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":27,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.0000479443816,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":27,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":9,"value":20480.064,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-0.06,-1.41,-6.03,-7.56,-4.16,-8.1],"totalChange":-8.1},"chaosEquivalent":20668.78,"lowConfidencePaySparkLine":{"data":[0,0,20,20,20,-14.29,25.15],"totalChange":25.15},"lowConfidenceReceiveSparkLine":{"data":[0,-0.06,-1.41,-6.03,-7.56,-4.16,-8.1],"totalChange":-8.1},"detailsId":"eternal-orb"},{"currencyTypeName":"Mirror Shard","pay":{"id":0,"league_id":1,"pay_currency_id":81,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":0.00083,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":81,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":1729.2,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[null,null,null,0,null,null,null],"totalChange":0},"receiveSparkLine":{"data":[],"totalChange":0},"chaosEquivalent":1467.01,"lowConfidencePaySparkLine":{"data":[0,14.29,12.5,10.77,-13.25,-13.25,-13.25],"totalChange":-13.25},"lowConfidenceReceiveSparkLine":{"data":[0,0.29,0,0.76,0.76,-5.71,-5.71],"totalChange":-5.71},"detailsId":"mirror-shard"},{"currencyTypeName":"Blessing of Chayula","pay":{"id":0,"league_id":1,"pay_currency_id":65,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.00435,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":65,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":267.4375,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,3.11,5,2.59,0.7,0.93,2.08],"totalChange":2.08},"chaosEquivalent":248.66,"lowConfidencePaySparkLine":{"data":[0,-1.52,-1.52,-3.47,-6.92,-10.34,-10.34],"totalChange":-10.34},"lowConfidenceReceiveSparkLine":{"data":[0,3.11,5,2.59,0.7,0.93,2.08],"totalChange":2.08},"detailsId":"blessing-of-chayula"},{"currencyTypeName":"Exalted Orb","pay":{"id":0,"league_id":1,"pay_currency_id":2,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":0.00769,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":2,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":80,"value":132,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.65,0.78,0.78,0.78,0.78,0.78],"totalChange":0.78},"receiveSparkLine":{"data":[0,0.27,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"chaosEquivalent":131.02,"lowConfidencePaySparkLine":{"data":[0,0.65,0.78,0.78,0.78,0.78,0.78],"totalChange":0.78},"lowConfidenceReceiveSparkLine":{"data":[0,0.27,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"detailsId":"exalted-orb"},{"currencyTypeName":"Divine Orb","pay":{"id":0,"league_id":1,"pay_currency_id":3,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.03965841379310345,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":3,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":56,"value":26,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,1.21,2.33,0.7,4.18,4.18,5.07],"totalChange":5.07},"receiveSparkLine":{"data":[0,3.85,0.09,0.4,1.85,0,0],"totalChange":0},"chaosEquivalent":25.61,"lowConfidencePaySparkLine":{"data":[0,1.21,2.33,0.7,4.18,4.18,5.07],"totalChange":5.07},"lowConfidenceReceiveSparkLine":{"data":[0,3.85,0.09,0.4,1.85,0,0],"totalChange":0},"detailsId":"divine-orb"},{"currencyTypeName":"Harbinger\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":76,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":0.04860216494845361,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":76,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":24.439393939393938,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-0.18,0.4,0.88,1.97,6.26,3.33],"totalChange":3.33},"receiveSparkLine":{"data":[0,0,0,0,0,0,-2.24],"totalChange":-2.24},"chaosEquivalent":22.51,"lowConfidencePaySparkLine":{"data":[0,-0.18,0.4,0.88,1.97,6.26,3.33],"totalChange":3.33},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,-2.24],"totalChange":-2.24},"detailsId":"harbingers-orb"},{"currencyTypeName":"Ancient Orb","pay":{"id":0,"league_id":1,"pay_currency_id":78,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":7,"value":0.05,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":78,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":48,"value":22,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,5.26,5.26,5.26,5.26,5.26,5.26],"totalChange":5.26},"receiveSparkLine":{"data":[0,-0.38,4.82,3.56,0.27,0.27,0.27],"totalChange":0.27},"chaosEquivalent":21,"lowConfidencePaySparkLine":{"data":[0,5.26,5.26,5.26,5.26,5.26,5.26],"totalChange":5.26},"lowConfidenceReceiveSparkLine":{"data":[0,-0.38,4.82,3.56,0.27,0.27,0.27],"totalChange":0.27},"detailsId":"ancient-orb"},{"currencyTypeName":"Orb of Annulment","pay":{"id":0,"league_id":1,"pay_currency_id":73,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":20,"value":0.06667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":73,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":44,"value":18.8588,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,1.8,7.28,3.94,4.94,14.29,7.14],"totalChange":7.14},"receiveSparkLine":{"data":[0,3.62,15.44,15.81,15.24,15.81,14.95],"totalChange":14.95},"chaosEquivalent":16.93,"lowConfidencePaySparkLine":{"data":[0,1.8,7.28,3.94,4.94,14.29,7.14],"totalChange":7.14},"lowConfidenceReceiveSparkLine":{"data":[0,3.62,15.44,15.81,15.24,15.81,14.95],"totalChange":14.95},"detailsId":"orb-of-annulment"},{"currencyTypeName":"Blessing of Uul-Netol","pay":{"id":0,"league_id":1,"pay_currency_id":64,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.16667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":64,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":9,"value":9.350515463917526,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-30.77,-34,-15.58,-29.53,-24.46,-28.07],"totalChange":-28.07},"chaosEquivalent":7.68,"lowConfidencePaySparkLine":{"data":[null,null,0,33.33,66.66,66.66,99.99],"totalChange":99.99},"lowConfidenceReceiveSparkLine":{"data":[0,-30.77,-34,-15.58,-29.53,-24.46,-28.07],"totalChange":-28.07},"detailsId":"blessing-of-uul-netol"},{"currencyTypeName":"Exalted Shard","pay":{"id":0,"league_id":1,"pay_currency_id":80,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":6,"value":0.16667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":80,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":11,"value":7,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0,null,null,0,0,0],"totalChange":0},"receiveSparkLine":{"data":[0,-11.74,-11.79,2.91,2.91,2.91,2.91],"totalChange":2.91},"chaosEquivalent":6.5,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,-11.74,-11.79,2.91,2.91,2.91,2.91],"totalChange":2.91},"detailsId":"exalted-shard"},{"currencyTypeName":"Master Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":48,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":20,"value":0.24879285714285715,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":48,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":64,"value":4.911668875,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,3.39,3.39,3.39,3.39,3.39,3.89],"totalChange":3.89},"receiveSparkLine":{"data":[0,0,0,18.72,22.5,15.17,22.79],"totalChange":22.79},"chaosEquivalent":4.47,"lowConfidencePaySparkLine":{"data":[0,3.39,3.39,3.39,3.39,3.39,3.89],"totalChange":3.89},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,18.72,22.5,15.17,22.79],"totalChange":22.79},"detailsId":"master-cartographers-sextant"},{"currencyTypeName":"Blessing of Esh","pay":{"id":0,"league_id":1,"pay_currency_id":63,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":63,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":23,"value":4,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":3,"lowConfidencePaySparkLine":{"data":[null,null,0,100,100,100,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"blessing-of-esh"},{"currencyTypeName":"Journeyman Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":47,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":17,"value":0.4230887878787879,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":47,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":2.918542857142857,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0.13,0.05,0.37,0.41,1.71,2.08],"totalChange":2.08},"receiveSparkLine":{"data":[0,-2.76,-16.27,-10.35,0.42,3.99,4.66],"totalChange":4.66},"chaosEquivalent":2.64,"lowConfidencePaySparkLine":{"data":[0,0.13,0.05,0.37,0.41,1.71,2.08],"totalChange":2.08},"lowConfidenceReceiveSparkLine":{"data":[0,-2.76,-16.27,-10.35,0.42,3.99,4.66],"totalChange":4.66},"detailsId":"journeyman-cartographers-sextant"},{"currencyTypeName":"Blessing of Xoph","pay":{"id":0,"league_id":1,"pay_currency_id":61,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":61,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":24,"value":2.483673469387755,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-33.33,-33.33,-33.33,-33.33,-9.93,-17.21],"totalChange":-17.21},"chaosEquivalent":2.24,"lowConfidencePaySparkLine":{"data":[null,null,0,100,100,100,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,-33.33,-33.33,-33.33,-33.33,-9.93,-17.21],"totalChange":-17.21},"detailsId":"blessing-of-xoph"},{"currencyTypeName":"Annulment Shard","pay":{"id":0,"league_id":1,"pay_currency_id":79,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":1.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":79,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":3.8,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[],"totalChange":0},"chaosEquivalent":2.23,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0,-9.09,-9.09,1718.18,1718.18,245.45],"totalChange":245.45},"detailsId":"annulment-shard"},{"currencyTypeName":"Blessing of Tul","pay":{"id":0,"league_id":1,"pay_currency_id":62,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":62,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":15,"value":2,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,22.91,0,0,0],"totalChange":0},"chaosEquivalent":2,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,22.91,0,0,0],"totalChange":0},"detailsId":"blessing-of-tul"},{"currencyTypeName":"Vaal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":8,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":40,"value":0.5834604444444444,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":8,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":81,"value":1.7833907142857144,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,3.03,3.03,3.03,3.03,3.03,3.87],"totalChange":3.87},"receiveSparkLine":{"data":[0,4.08,2.53,1.19,4.08,4.08,3.12],"totalChange":3.12},"chaosEquivalent":1.75,"lowConfidencePaySparkLine":{"data":[0,3.03,3.03,3.03,3.03,3.03,3.87],"totalChange":3.87},"lowConfidenceReceiveSparkLine":{"data":[0,4.08,2.53,1.19,4.08,4.08,3.12],"totalChange":3.12},"detailsId":"vaal-orb"},{"currencyTypeName":"Orb of Horizons","pay":{"id":0,"league_id":1,"pay_currency_id":75,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.958204,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":75,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":31,"value":1.79100045,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-6.68,5.03,-3.73,-4.13,-2.13,-4.61],"totalChange":-4.61},"chaosEquivalent":1.42,"lowConfidencePaySparkLine":{"data":[0,-0.33,0.72,4.29,0.72,-3.63,4.36],"totalChange":4.36},"lowConfidenceReceiveSparkLine":{"data":[0,-6.68,5.03,-3.73,-4.13,-2.13,-4.61],"totalChange":-4.61},"detailsId":"orb-of-horizons"},{"currencyTypeName":"Splinter of Chayula","pay":{"id":0,"league_id":1,"pay_currency_id":60,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":3,"value":0.83333,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":60,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":46,"value":1.5,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,5.26,-9.67,0.7,-21.05,-21.05,-21.05],"totalChange":-21.05},"chaosEquivalent":1.35,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,5.26,-9.67,0.7,-21.05,-21.05,-21.05],"totalChange":-21.05},"detailsId":"splinter-of-chayula"},{"currencyTypeName":"Gemcutter\'s Prism","pay":{"id":0,"league_id":1,"pay_currency_id":15,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":14,"value":0.7885894949494949,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":15,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":74,"value":1.3104130434782608,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,-0.9,-0.9,-1.01,4.44,-0.9,4.73],"totalChange":4.73},"receiveSparkLine":{"data":[0,4.2,4.37,1.67,5.04,1.93,1.19],"totalChange":1.19},"chaosEquivalent":1.29,"lowConfidencePaySparkLine":{"data":[0,-0.9,-0.9,-1.01,4.44,-0.9,4.73],"totalChange":4.73},"lowConfidenceReceiveSparkLine":{"data":[0,4.2,4.37,1.67,5.04,1.93,1.19],"totalChange":1.19},"detailsId":"gemcutters-prism"},{"currencyTypeName":"Apprentice Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":46,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":14,"value":0.9750981212121212,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":46,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":52,"value":1,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-5.02,-6.61,-3.17,-2.11,-3.38,-4.22],"totalChange":-4.22},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":1.01,"lowConfidencePaySparkLine":{"data":[0,-5.02,-6.61,-3.17,-2.11,-3.38,-4.22],"totalChange":-4.22},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"apprentice-cartographers-sextant"},{"currencyTypeName":"Orb of Regret","pay":{"id":0,"league_id":1,"pay_currency_id":9,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":18,"value":1.0964574468085106,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":9,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":92,"value":1.0004330666666668,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0.84,0.94,0.31,0.11,0.32],"totalChange":0.32},"receiveSparkLine":{"data":[0,0,0,0,1.51,0,0.04],"totalChange":0.04},"chaosEquivalent":0.96,"lowConfidencePaySparkLine":{"data":[0,0,0.84,0.94,0.31,0.11,0.32],"totalChange":0.32},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,1.51,0,0.04],"totalChange":0.04},"detailsId":"orb-of-regret"},{"currencyTypeName":"Regal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":7,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":10,"value":1.3920958247422681,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":7,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":73,"value":0.8269064536082474,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0.04,0,0,0,0.12,0.57],"totalChange":0.57},"receiveSparkLine":{"data":[0,-0.09,-2.23,0.79,-1.6,1.46,0.7],"totalChange":0.7},"chaosEquivalent":0.77,"lowConfidencePaySparkLine":{"data":[0,0.04,0,0,0,0.12,0.57],"totalChange":0.57},"lowConfidenceReceiveSparkLine":{"data":[0,-0.09,-2.23,0.79,-1.6,1.46,0.7],"totalChange":0.7},"detailsId":"regal-orb"},{"currencyTypeName":"Engineer\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":77,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":3,"value":2.605612244897959,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":77,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":17,"value":0.8584277931034483,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,18.02,26.46,12.78,12.41,12.81,11.17],"totalChange":11.17},"chaosEquivalent":0.62,"lowConfidencePaySparkLine":{"data":[0,2,11.98,11.98,30.74,30.74,30.49],"totalChange":30.49},"lowConfidenceReceiveSparkLine":{"data":[0,18.02,26.46,12.78,12.41,12.81,11.17],"totalChange":11.17},"detailsId":"engineers-orb"},{"currencyTypeName":"Orb of Fusing","pay":{"id":0,"league_id":1,"pay_currency_id":5,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":1.95,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":5,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":0.55044,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0.78,0.62,0.54,2.53,2.56],"totalChange":2.56},"receiveSparkLine":{"data":[0,-0.93,-2.39,-0.55,-1.99,-1,-0.92],"totalChange":-0.92},"chaosEquivalent":0.53,"lowConfidencePaySparkLine":{"data":[0,0,0.78,0.62,0.54,2.53,2.56],"totalChange":2.56},"lowConfidenceReceiveSparkLine":{"data":[0,-0.93,-2.39,-0.55,-1.99,-1,-0.92],"totalChange":-0.92},"detailsId":"orb-of-fusing"},{"currencyTypeName":"Orb of Scouring","pay":{"id":0,"league_id":1,"pay_currency_id":14,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":2.1,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":14,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":91,"value":0.5354012105263158,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,4.55,4.55,4.55,5.09,8.71,9.52],"totalChange":9.52},"receiveSparkLine":{"data":[0,0,0,0,0,-0.56,7.08],"totalChange":7.08},"chaosEquivalent":0.51,"lowConfidencePaySparkLine":{"data":[0,4.55,4.55,4.55,5.09,8.71,9.52],"totalChange":9.52},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,-0.56,7.08],"totalChange":7.08},"detailsId":"orb-of-scouring"},{"currencyTypeName":"Cartographer\'s Chisel","pay":{"id":0,"league_id":1,"pay_currency_id":10,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":2.4,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":10,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":58,"value":0.46549529545454543,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-3.14,-3.14,0.9,0.9,0.9,0.9],"totalChange":0.9},"receiveSparkLine":{"data":[0,0.97,-2.18,1.69,-2.38,-1.15,-0.13],"totalChange":-0.13},"chaosEquivalent":0.44,"lowConfidencePaySparkLine":{"data":[0,-3.14,-3.14,0.9,0.9,0.9,0.9],"totalChange":0.9},"lowConfidenceReceiveSparkLine":{"data":[0,0.97,-2.18,1.69,-2.38,-1.15,-0.13],"totalChange":-0.13},"detailsId":"cartographers-chisel"},{"currencyTypeName":"Orb of Alchemy","pay":{"id":0,"league_id":1,"pay_currency_id":4,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":2.841666666666667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":4,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":65,"value":0.35714,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-0.63,0.07,6.42,6.41,2.75,4.86],"totalChange":4.86},"receiveSparkLine":{"data":[0,2.66,-5.08,-7.82,-6.04,-6.22,-14.4],"totalChange":-14.4},"chaosEquivalent":0.35,"lowConfidencePaySparkLine":{"data":[0,-0.63,0.07,6.42,6.41,2.75,4.86],"totalChange":4.86},"lowConfidenceReceiveSparkLine":{"data":[0,2.66,-5.08,-7.82,-6.04,-6.22,-14.4],"totalChange":-14.4},"detailsId":"orb-of-alchemy"},{"currencyTypeName":"Silver Coin","pay":{"id":0,"league_id":1,"pay_currency_id":12,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":15,"value":3.6,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":12,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.3146063292682927,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,5.33,2.76,0.91,2.92,3.72,3.72],"totalChange":3.72},"receiveSparkLine":{"data":[0,-8.82,-8.94,-8.94,-8.94,2.68,0.27],"totalChange":0.27},"chaosEquivalent":0.3,"lowConfidencePaySparkLine":{"data":[0,5.33,2.76,0.91,2.92,3.72,3.72],"totalChange":3.72},"lowConfidenceReceiveSparkLine":{"data":[0,-8.82,-8.94,-8.94,-8.94,2.68,0.27],"totalChange":0.27},"detailsId":"silver-coin"},{"currencyTypeName":"Blessed Orb","pay":{"id":0,"league_id":1,"pay_currency_id":18,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":10,"value":3.7901630434782607,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":18,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":53,"value":0.32171585542168674,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.1,0.06,0.06,0.7,0.23,0.25],"totalChange":0.25},"receiveSparkLine":{"data":[0,0,-1.04,-1.47,-1.55,0,-3.48],"totalChange":-3.48},"chaosEquivalent":0.29,"lowConfidencePaySparkLine":{"data":[0,0.1,0.06,0.06,0.7,0.23,0.25],"totalChange":0.25},"lowConfidenceReceiveSparkLine":{"data":[0,0,-1.04,-1.47,-1.55,0,-3.48],"totalChange":-3.48},"detailsId":"blessed-orb"},{"currencyTypeName":"Chromatic Orb","pay":{"id":0,"league_id":1,"pay_currency_id":17,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":30,"value":3.900757575757576,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":17,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":91,"value":0.27702283333333333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-1.17,-1.9,-0.9,-0.75,0.03,0.01],"totalChange":0.01},"receiveSparkLine":{"data":[0,-1.38,-1.35,-2.08,-2.08,-2.08,-2.35],"totalChange":-2.35},"chaosEquivalent":0.27,"lowConfidencePaySparkLine":{"data":[0,-1.17,-1.9,-0.9,-0.75,0.03,0.01],"totalChange":0.01},"lowConfidenceReceiveSparkLine":{"data":[0,-1.38,-1.35,-2.08,-2.08,-2.08,-2.35],"totalChange":-2.35},"detailsId":"chromatic-orb"},{"currencyTypeName":"Orb of Binding","pay":{"id":0,"league_id":1,"pay_currency_id":74,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":6,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":74,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":28,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":0.25,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"orb-of-binding"},{"currencyTypeName":"Splinter of Xoph","pay":{"id":0,"league_id":1,"pay_currency_id":56,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":8,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":56,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":29,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-5.08,-14.97,8.86,-18.21,-14.21,-20.82],"totalChange":-20.82},"chaosEquivalent":0.23,"lowConfidencePaySparkLine":{"data":[null,null,0,14.29,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,-5.08,-14.97,8.86,-18.21,-14.21,-20.82],"totalChange":-20.82},"detailsId":"splinter-of-xoph"},{"currencyTypeName":"Splinter of Uul-Netol","pay":{"id":0,"league_id":1,"pay_currency_id":59,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":15,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":59,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,1.07,1.07,1.07,1.07,1.07,1.07],"totalChange":1.07},"chaosEquivalent":0.2,"lowConfidencePaySparkLine":{"data":[null,null,0,50,50,50,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,1.07,1.07,1.07,1.07,1.07,1.07],"totalChange":1.07},"detailsId":"splinter-of-uul-netol"},{"currencyTypeName":"Orb of Alteration","pay":{"id":0,"league_id":1,"pay_currency_id":6,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":32,"value":6.897234042553191,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":6,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":61,"value":0.14286,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,3.09,4.16,5.69,9.14,5.69,4.2],"totalChange":4.2},"receiveSparkLine":{"data":[0,-0.03,-0.5,-0.41,-0.73,0,0],"totalChange":0},"chaosEquivalent":0.14,"lowConfidencePaySparkLine":{"data":[0,3.09,4.16,5.69,9.14,5.69,4.2],"totalChange":4.2},"lowConfidenceReceiveSparkLine":{"data":[0,-0.03,-0.5,-0.41,-0.73,0,0],"totalChange":0},"detailsId":"orb-of-alteration"},{"currencyTypeName":"Jeweller\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":11,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":24,"value":7.8,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":11,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":75,"value":0.13261883720930231,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.3,1.86,3.61,3.33,4.92,6.27],"totalChange":6.27},"receiveSparkLine":{"data":[0,-1.86,1.35,-2.11,-3.08,-1.86,-2.39],"totalChange":-2.39},"chaosEquivalent":0.13,"lowConfidencePaySparkLine":{"data":[0,0.3,1.86,3.61,3.33,4.92,6.27],"totalChange":6.27},"lowConfidenceReceiveSparkLine":{"data":[0,-1.86,1.35,-2.11,-3.08,-1.86,-2.39],"totalChange":-2.39},"detailsId":"jewellers-orb"},{"currencyTypeName":"Orb of Chance","pay":{"id":0,"league_id":1,"pay_currency_id":16,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":7,"value":8.64997340425532,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":16,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":76,"value":0.11111,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-3.04,0.02,0.72,-0.25,-0.36,7.21],"totalChange":7.21},"receiveSparkLine":{"data":[0,0,1.83,0,-2.24,0,-5.56],"totalChange":-5.56},"chaosEquivalent":0.11,"lowConfidencePaySparkLine":{"data":[0,-3.04,0.02,0.72,-0.25,-0.36,7.21],"totalChange":7.21},"lowConfidenceReceiveSparkLine":{"data":[0,0,1.83,0,-2.24,0,-5.56],"totalChange":-5.56},"detailsId":"orb-of-chance"},{"currencyTypeName":"Glassblower\'s Bauble","pay":{"id":0,"league_id":1,"pay_currency_id":19,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":15.31340206185567,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":19,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":51,"value":0.14286,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-0.12,0,1.2,2.08,3.07,3.07],"totalChange":3.07},"chaosEquivalent":0.1,"lowConfidencePaySparkLine":{"data":[0,0,-1.94,3.94,3.9,3.9,9.05],"totalChange":9.05},"lowConfidenceReceiveSparkLine":{"data":[0,-0.12,0,1.2,2.08,3.07,3.07],"totalChange":3.07},"detailsId":"glassblowers-bauble"},{"currencyTypeName":"Splinter of Tul","pay":{"id":0,"league_id":1,"pay_currency_id":57,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":20,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":57,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":23,"value":0.14089376744186047,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,4.1,4.81,5.81,5.86,9.04,18.99],"totalChange":18.99},"chaosEquivalent":0.1,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,4.1,4.81,5.81,5.86,9.04,18.99],"totalChange":18.99},"detailsId":"splinter-of-tul"},{"currencyTypeName":"Splinter of Esh","pay":{"id":0,"league_id":1,"pay_currency_id":58,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":20,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":58,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":29,"value":0.1326773181818182,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0.47,0.74,8.18,8.18,8.18,0.47],"totalChange":0.47},"chaosEquivalent":0.09,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0.47,0.74,8.18,8.18,8.18,0.47],"totalChange":0.47},"detailsId":"splinter-of-esh"},{"currencyTypeName":"Orb of Augmentation","pay":{"id":0,"league_id":1,"pay_currency_id":20,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":5,"value":42.121212121212125,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":20,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.035082486842105264,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[null,null,null,null,null,null,0],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,1.83,5.26],"totalChange":5.26},"chaosEquivalent":0.03,"lowConfidencePaySparkLine":{"data":[0,-45.46,-46.56,-41.35,-39.88,-39.88,-42.9],"totalChange":-42.9},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,1.83,5.26],"totalChange":5.26},"detailsId":"orb-of-augmentation"},{"currencyTypeName":"Blacksmith\'s Whetstone","pay":{"id":0,"league_id":1,"pay_currency_id":25,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":137.4747474747475,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":25,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":38,"value":0.024965935064935066,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,21.31,20.44,18.01,21.49,17.2,20.28],"totalChange":20.28},"receiveSparkLine":{"data":[0,-12.72,-18.33,-18.7,-16.53,-16.53,-16.64],"totalChange":-16.64},"chaosEquivalent":0.02,"lowConfidencePaySparkLine":{"data":[0,21.31,20.44,18.01,21.49,17.2,20.28],"totalChange":20.28},"lowConfidenceReceiveSparkLine":{"data":[0,-12.72,-18.33,-18.7,-16.53,-16.53,-16.64],"totalChange":-16.64},"detailsId":"blacksmiths-whetstone"},{"currencyTypeName":"Perandus Coin","pay":{"id":0,"league_id":1,"pay_currency_id":13,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":200,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":13,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":0.011368279569892474,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,2.35,-7.37,-12.56,-16.67,-10.22,-4.79],"totalChange":-4.79},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0.22,-2.43,-4.97,-4.97,2.72,2.72],"totalChange":2.72},"lowConfidenceReceiveSparkLine":{"data":[0,2.35,-7.37,-12.56,-16.67,-10.22,-4.79],"totalChange":-4.79},"detailsId":"perandus-coin"},{"currencyTypeName":"Orb of Transmutation","pay":{"id":0,"league_id":1,"pay_currency_id":21,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":196.62,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":21,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":53,"value":0.01613,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0,null,21.78,21.78,null,null],"totalChange":21.78},"receiveSparkLine":{"data":[0,0,-0.42,-0.12,-2.46,-5.76,-3.24],"totalChange":-3.24},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0,-1.33,21.78,21.78,22.08,22.06],"totalChange":22.06},"lowConfidenceReceiveSparkLine":{"data":[0,0,-0.42,-0.12,-2.46,-5.76,-3.24],"totalChange":-3.24},"detailsId":"orb-of-transmutation"},{"currencyTypeName":"Portal Scroll","pay":{"id":0,"league_id":1,"pay_currency_id":24,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":364.8484848484849,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":24,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":38,"value":0.014209822916666667,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,-0.12,-4.8,-4.8,-14.76],"totalChange":-14.76},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,-23.5,14.82,46.05,46.05,52.82,76.13],"totalChange":76.13},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,-0.12,-4.8,-4.8,-14.76],"totalChange":-14.76},"detailsId":"portal-scroll"},{"currencyTypeName":"Armourer\'s Scrap","pay":{"id":0,"league_id":1,"pay_currency_id":26,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":6,"value":197.55050505050505,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":26,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":0.02,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[null,null,null,0,0,null,4.57],"totalChange":4.57},"receiveSparkLine":{"data":[0,0.72,1.65,10.01,9.9,10.01,10.01],"totalChange":10.01},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0,1.53,0.71,0.71,1.73,5.31],"totalChange":5.31},"lowConfidenceReceiveSparkLine":{"data":[0,0.72,1.65,10.01,9.9,10.01,10.01],"totalChange":10.01},"detailsId":"armourers-scrap"}],"currencyDetails":[{"id":1,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1","name":"Chaos Orb","poeTradeId":4},{"id":2,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&w=1&h=1","name":"Exalted Orb","poeTradeId":6},{"id":3,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyModValues.png?scale=1&w=1&h=1","name":"Divine Orb","poeTradeId":15},{"id":4,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeToRare.png?scale=1&w=1&h=1","name":"Orb of Alchemy","poeTradeId":3},{"id":5,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketLinks.png?scale=1&w=1&h=1","name":"Orb of Fusing","poeTradeId":2},{"id":6,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollMagic.png?scale=1&w=1&h=1","name":"Orb of Alteration","poeTradeId":1},{"id":7,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeMagicToRare.png?scale=1&w=1&h=1","name":"Regal Orb","poeTradeId":14},{"id":8,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyVaal.png?scale=1&w=1&h=1","name":"Vaal Orb","poeTradeId":16},{"id":9,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyPassiveSkillRefund.png?scale=1&w=1&h=1","name":"Orb of Regret","poeTradeId":13},{"id":10,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyMapQuality.png?scale=1&w=1&h=1","name":"Cartographer\'s Chisel","poeTradeId":10},{"id":11,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketNumbers.png?scale=1&w=1&h=1","name":"Jeweller\'s Orb","poeTradeId":8},{"id":12,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SilverObol.png?scale=1&w=1&h=1","name":"Silver Coin","poeTradeId":35},{"id":13,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyCoin.png?scale=1&w=1&h=1","name":"Perandus Coin","poeTradeId":26},{"id":14,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyConvertToNormal.png?scale=1&w=1&h=1","name":"Orb of Scouring","poeTradeId":11},{"id":15,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyGemQuality.png?scale=1&w=1&h=1","name":"Gemcutter\'s Prism","poeTradeId":5},{"id":16,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeRandomly.png?scale=1&w=1&h=1","name":"Orb of Chance","poeTradeId":9},{"id":17,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketColours.png?scale=1&w=1&h=1","name":"Chromatic Orb","poeTradeId":7},{"id":18,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyImplicitMod.png?scale=1&w=1&h=1","name":"Blessed Orb","poeTradeId":12},{"id":19,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyFlaskQuality.png?scale=1&w=1&h=1","name":"Glassblower\'s Bauble","poeTradeId":21},{"id":20,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToMagic.png?scale=1&w=1&h=1","name":"Orb of Augmentation","poeTradeId":23},{"id":21,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeToMagic.png?scale=1&w=1&h=1","name":"Orb of Transmutation","poeTradeId":22},{"id":22,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyDuplicate.png?scale=1&w=1&h=1","name":"Mirror of Kalandra","poeTradeId":24},{"id":23,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyIdentification.png?scale=1&w=1&h=1","name":"Scroll of Wisdom","poeTradeId":17},{"id":24,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyPortal.png?scale=1&w=1&h=1","name":"Portal Scroll","poeTradeId":18},{"id":25,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyWeaponQuality.png?scale=1&w=1&h=1","name":"Blacksmith\'s Whetstone","poeTradeId":20},{"id":26,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyArmourQuality.png?scale=1&w=1&h=1","name":"Armourer\'s Scrap","poeTradeId":19},{"id":27,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyImprintOrb.png?scale=1&w=1&h=1","name":"Eternal Orb","poeTradeId":25},{"id":28,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal04.png?scale=1&scaleIndex=0&w=1&h=1","name":"Sacrifice at Dusk","poeTradeId":27},{"id":29,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal01.png?scale=1&w=1&h=1&v=3b21ce0cd4c0b9e8cf5db6257daf831a3","name":"Sacrifice at Midnight","poeTradeId":28},{"id":30,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal02.png?scale=1&w=1&h=1&v=3ead6455599ec6c303f54ba98d6f8eb23","name":"Sacrifice at Dawn","poeTradeId":29},{"id":31,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal03.png?scale=1&w=1&h=1&v=ba374d543316349b87de121039c3cc6f3","name":"Sacrifice at Noon","poeTradeId":30},{"id":32,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal04.png?scale=1&w=1&h=1&v=735839ceae0fc45d15ec69555e9314133","name":"Mortal Grief","poeTradeId":31},{"id":33,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal01.png?scale=1&w=1&h=1&v=9336df5d7d0befd5963b71e7a68479ce3","name":"Mortal Rage","poeTradeId":32},{"id":34,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal03.png?scale=1&w=1&h=1&v=9fb218dad337a4627a59f74bfa2d6c863","name":"Mortal Ignorance","poeTradeId":34},{"id":35,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal02.png?scale=1&w=1&h=1&v=db5b529a8425bd2b9fd7bee9fca2e0183","name":"Mortal Hope","poeTradeId":33},{"id":36,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt01.png?scale=1&w=1&h=1&v=044cbdae1e06e621585eaa627c2162db3","name":"Eber\'s Key","poeTradeId":36},{"id":37,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt02.png?scale=1&w=1&h=1&v=757829336b7239c4b1e398c203f0cca03","name":"Yriel\'s Key","poeTradeId":37},{"id":38,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt03.png?scale=1&w=1&h=1&v=6e43b636847d46b560ef0518869a72943","name":"Inya\'s Key","poeTradeId":38},{"id":39,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt04.png?scale=1&w=1&h=1&v=5c3afc6bad631a50f9fe5ccb570aeb363","name":"Volkuur\'s Key","poeTradeId":39},{"id":40,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentHydra.png?scale=1&w=1&h=1&v=fd37e4be7672c0db8b549a1b16ad489d3","name":"Fragment of the Hydra","poeTradeId":41},{"id":41,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentPhoenix.png?scale=1&w=1&h=1&v=8f76720ab06bb40a6d6f75730f92e4a73","name":"Fragment of the Phoenix","poeTradeId":42},{"id":42,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentMinotaur.png?scale=1&w=1&h=1&v=e0e3f5e7daf32736d63fc3df1ba981223","name":"Fragment of the Minotaur","poeTradeId":43},{"id":43,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentChimera.png?scale=1&w=1&h=1&v=15bd6ba80e1853c22ae3acf40abf64283","name":"Fragment of the Chimera","poeTradeId":44},{"id":44,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Labyrinth.png?scale=1&w=1&h=1&v=ef005aef5d2f9135d6922f4b1b912f783","name":"Offering to the Goddess","poeTradeId":40},{"id":45,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyImprintOrb.png?scale=1&w=1&h=1","name":"Stacked Deck","poeTradeId":-1},{"id":46,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AtlasRadiusWhite.png?scale=1&w=1&h=1","name":"Apprentice Cartographer\'s Sextant","poeTradeId":45},{"id":47,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AtlasRadiusYellow.png?scale=1&w=1&h=1","name":"Journeyman Cartographer\'s Sextant","poeTradeId":46},{"id":48,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AtlasRadiusRed.png?scale=1&w=1&h=1","name":"Master Cartographer\'s Sextant","poeTradeId":47},{"id":49,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealWhite.png?scale=1&w=1&h=1","name":"Apprentice Cartographer\'s Seal","poeTradeId":-1},{"id":50,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealYellow.png?scale=1&w=1&h=1","name":"Journeyman Cartographer\'s Seal","poeTradeId":-1},{"id":51,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Master Cartographer\'s Seal","poeTradeId":-1},{"id":52,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Sacrifice Set","poeTradeId":48},{"id":53,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Mortal Set","poeTradeId":49},{"id":54,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Pale Court Set","poeTradeId":50},{"id":55,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Shaper Set","poeTradeId":51},{"id":56,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Xoph","poeTradeId":52},{"id":57,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Tul","poeTradeId":53},{"id":58,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Esh","poeTradeId":54},{"id":59,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Uul-Netol","poeTradeId":55},{"id":60,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Chayula","poeTradeId":56},{"id":61,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Xoph","poeTradeId":57},{"id":62,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Tul","poeTradeId":58},{"id":63,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Esh","poeTradeId":59},{"id":64,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Uul-Netol","poeTradeId":60},{"id":65,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Chayula","poeTradeId":61},{"id":66,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Xoph\'s Breachstone","poeTradeId":62},{"id":67,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Tul\'s Breachstone","poeTradeId":63},{"id":68,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Esh\'s Breachstone","poeTradeId":64},{"id":69,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Uul-Netol\'s Breachstone","poeTradeId":65},{"id":70,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Chayula\'s Breachstone","poeTradeId":66},{"id":71,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/VaultMap.png?scale=1&scaleIndex=0&w=1&h=1","name":"Ancient Reliquary Key","poeTradeId":494},{"id":72,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/SinFlaskEmpty.png?scale=1&scaleIndex=0&w=1&h=2","name":"Divine Vessel","poeTradeId":512},{"id":73,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AnnullOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Orb of Annulment","poeTradeId":513},{"id":74,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/BindingOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Orb of Binding","poeTradeId":514},{"id":75,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/HorizonOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Orb of Horizons","poeTradeId":515},{"id":76,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/HarbingerOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Harbinger\'s Orb","poeTradeId":516},{"id":77,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/EngineersOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Engineer\'s Orb","poeTradeId":517},{"id":78,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AncientOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Ancient Orb","poeTradeId":518},{"id":79,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AnnullShard.png?scale=1&scaleIndex=0&w=1&h=1","name":"Annulment Shard","poeTradeId":519},{"id":80,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/ExaltedShard.png?scale=1&scaleIndex=0&w=1&h=1","name":"Exalted Shard","poeTradeId":521},{"id":81,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/MirrorShard.png?scale=1&scaleIndex=0&w=1&h=1","name":"Mirror Shard","poeTradeId":520},{"id":82,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/VaultMap3.png?scale=1&scaleIndex=0&w=1&h=1","name":"Timeworn Reliquary Key","poeTradeId":-1},{"id":83,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Xoph\'s Charged Breachstone","poeTradeId":-1},{"id":84,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Tul\'s Charged Breachstone","poeTradeId":-1},{"id":85,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Esh\'s Charged Breachstone","poeTradeId":-1},{"id":86,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Uul-Netol\'s Charged Breachstone","poeTradeId":-1},{"id":87,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Chayula\'s Charged Breachstone","poeTradeId":-1},{"id":88,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Xoph\'s Enriched Breachstone","poeTradeId":-1},{"id":89,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Tul\'s Enriched Breachstone","poeTradeId":-1},{"id":90,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Esh\'s Enriched Breachstone","poeTradeId":-1},{"id":91,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Uul-Netol\'s Enriched Breachstone","poeTradeId":-1},{"id":92,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Chayula\'s Enriched Breachstone","poeTradeId":-1},{"id":93,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Xoph\'s Pure Breachstone","poeTradeId":-1},{"id":94,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Tul\'s Pure Breachstone","poeTradeId":-1},{"id":95,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Esh\'s Pure Breachstone","poeTradeId":-1},{"id":96,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Uul-Netol\'s Pure Breachstone","poeTradeId":-1},{"id":97,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Chayula\'s Pure Breachstone","poeTradeId":-1}],"map":{"Mirror of Kalandra":{"currencyTypeName":"Mirror of Kalandra","pay":{"id":0,"league_id":1,"pay_currency_id":22,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":0.0000300679,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":22,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":21,"value":34056,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0,0,0,0,-0.23],"totalChange":-0.23},"receiveSparkLine":{"data":[0,0.28,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"chaosEquivalent":33657.03,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,-0.23],"totalChange":-0.23},"lowConfidenceReceiveSparkLine":{"data":[0,0.28,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"detailsId":"mirror-of-kalandra"},"Eternal Orb":{"currencyTypeName":"Eternal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":27,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.0000479443816,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":27,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":9,"value":20480.064,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-0.06,-1.41,-6.03,-7.56,-4.16,-8.1],"totalChange":-8.1},"chaosEquivalent":20668.78,"lowConfidencePaySparkLine":{"data":[0,0,20,20,20,-14.29,25.15],"totalChange":25.15},"lowConfidenceReceiveSparkLine":{"data":[0,-0.06,-1.41,-6.03,-7.56,-4.16,-8.1],"totalChange":-8.1},"detailsId":"eternal-orb"},"Mirror Shard":{"currencyTypeName":"Mirror Shard","pay":{"id":0,"league_id":1,"pay_currency_id":81,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":0.00083,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":81,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":1729.2,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[null,null,null,0,null,null,null],"totalChange":0},"receiveSparkLine":{"data":[],"totalChange":0},"chaosEquivalent":1467.01,"lowConfidencePaySparkLine":{"data":[0,14.29,12.5,10.77,-13.25,-13.25,-13.25],"totalChange":-13.25},"lowConfidenceReceiveSparkLine":{"data":[0,0.29,0,0.76,0.76,-5.71,-5.71],"totalChange":-5.71},"detailsId":"mirror-shard"},"Blessing of Chayula":{"currencyTypeName":"Blessing of Chayula","pay":{"id":0,"league_id":1,"pay_currency_id":65,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.00435,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":65,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":267.4375,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,3.11,5,2.59,0.7,0.93,2.08],"totalChange":2.08},"chaosEquivalent":248.66,"lowConfidencePaySparkLine":{"data":[0,-1.52,-1.52,-3.47,-6.92,-10.34,-10.34],"totalChange":-10.34},"lowConfidenceReceiveSparkLine":{"data":[0,3.11,5,2.59,0.7,0.93,2.08],"totalChange":2.08},"detailsId":"blessing-of-chayula"},"Exalted Orb":{"currencyTypeName":"Exalted Orb","pay":{"id":0,"league_id":1,"pay_currency_id":2,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":0.00769,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":2,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":80,"value":132,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.65,0.78,0.78,0.78,0.78,0.78],"totalChange":0.78},"receiveSparkLine":{"data":[0,0.27,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"chaosEquivalent":131.02,"lowConfidencePaySparkLine":{"data":[0,0.65,0.78,0.78,0.78,0.78,0.78],"totalChange":0.78},"lowConfidenceReceiveSparkLine":{"data":[0,0.27,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"detailsId":"exalted-orb"},"Divine Orb":{"currencyTypeName":"Divine Orb","pay":{"id":0,"league_id":1,"pay_currency_id":3,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.03965841379310345,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":3,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":56,"value":26,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,1.21,2.33,0.7,4.18,4.18,5.07],"totalChange":5.07},"receiveSparkLine":{"data":[0,3.85,0.09,0.4,1.85,0,0],"totalChange":0},"chaosEquivalent":25.61,"lowConfidencePaySparkLine":{"data":[0,1.21,2.33,0.7,4.18,4.18,5.07],"totalChange":5.07},"lowConfidenceReceiveSparkLine":{"data":[0,3.85,0.09,0.4,1.85,0,0],"totalChange":0},"detailsId":"divine-orb"},"Harbinger\'s Orb":{"currencyTypeName":"Harbinger\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":76,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":0.04860216494845361,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":76,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":24.439393939393938,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-0.18,0.4,0.88,1.97,6.26,3.33],"totalChange":3.33},"receiveSparkLine":{"data":[0,0,0,0,0,0,-2.24],"totalChange":-2.24},"chaosEquivalent":22.51,"lowConfidencePaySparkLine":{"data":[0,-0.18,0.4,0.88,1.97,6.26,3.33],"totalChange":3.33},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,-2.24],"totalChange":-2.24},"detailsId":"harbingers-orb"},"Ancient Orb":{"currencyTypeName":"Ancient Orb","pay":{"id":0,"league_id":1,"pay_currency_id":78,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":7,"value":0.05,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":78,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":48,"value":22,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,5.26,5.26,5.26,5.26,5.26,5.26],"totalChange":5.26},"receiveSparkLine":{"data":[0,-0.38,4.82,3.56,0.27,0.27,0.27],"totalChange":0.27},"chaosEquivalent":21,"lowConfidencePaySparkLine":{"data":[0,5.26,5.26,5.26,5.26,5.26,5.26],"totalChange":5.26},"lowConfidenceReceiveSparkLine":{"data":[0,-0.38,4.82,3.56,0.27,0.27,0.27],"totalChange":0.27},"detailsId":"ancient-orb"},"Orb of Annulment":{"currencyTypeName":"Orb of Annulment","pay":{"id":0,"league_id":1,"pay_currency_id":73,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":20,"value":0.06667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":73,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":44,"value":18.8588,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,1.8,7.28,3.94,4.94,14.29,7.14],"totalChange":7.14},"receiveSparkLine":{"data":[0,3.62,15.44,15.81,15.24,15.81,14.95],"totalChange":14.95},"chaosEquivalent":16.93,"lowConfidencePaySparkLine":{"data":[0,1.8,7.28,3.94,4.94,14.29,7.14],"totalChange":7.14},"lowConfidenceReceiveSparkLine":{"data":[0,3.62,15.44,15.81,15.24,15.81,14.95],"totalChange":14.95},"detailsId":"orb-of-annulment"},"Blessing of Uul-Netol":{"currencyTypeName":"Blessing of Uul-Netol","pay":{"id":0,"league_id":1,"pay_currency_id":64,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.16667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":64,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":9,"value":9.350515463917526,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-30.77,-34,-15.58,-29.53,-24.46,-28.07],"totalChange":-28.07},"chaosEquivalent":7.68,"lowConfidencePaySparkLine":{"data":[null,null,0,33.33,66.66,66.66,99.99],"totalChange":99.99},"lowConfidenceReceiveSparkLine":{"data":[0,-30.77,-34,-15.58,-29.53,-24.46,-28.07],"totalChange":-28.07},"detailsId":"blessing-of-uul-netol"},"Exalted Shard":{"currencyTypeName":"Exalted Shard","pay":{"id":0,"league_id":1,"pay_currency_id":80,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":6,"value":0.16667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":80,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":11,"value":7,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0,null,null,0,0,0],"totalChange":0},"receiveSparkLine":{"data":[0,-11.74,-11.79,2.91,2.91,2.91,2.91],"totalChange":2.91},"chaosEquivalent":6.5,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,-11.74,-11.79,2.91,2.91,2.91,2.91],"totalChange":2.91},"detailsId":"exalted-shard"},"Master Cartographer\'s Sextant":{"currencyTypeName":"Master Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":48,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":20,"value":0.24879285714285715,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":48,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":64,"value":4.911668875,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,3.39,3.39,3.39,3.39,3.39,3.89],"totalChange":3.89},"receiveSparkLine":{"data":[0,0,0,18.72,22.5,15.17,22.79],"totalChange":22.79},"chaosEquivalent":4.47,"lowConfidencePaySparkLine":{"data":[0,3.39,3.39,3.39,3.39,3.39,3.89],"totalChange":3.89},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,18.72,22.5,15.17,22.79],"totalChange":22.79},"detailsId":"master-cartographers-sextant"},"Blessing of Esh":{"currencyTypeName":"Blessing of Esh","pay":{"id":0,"league_id":1,"pay_currency_id":63,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":63,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":23,"value":4,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":3,"lowConfidencePaySparkLine":{"data":[null,null,0,100,100,100,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"blessing-of-esh"},"Journeyman Cartographer\'s Sextant":{"currencyTypeName":"Journeyman Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":47,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":17,"value":0.4230887878787879,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":47,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":2.918542857142857,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0.13,0.05,0.37,0.41,1.71,2.08],"totalChange":2.08},"receiveSparkLine":{"data":[0,-2.76,-16.27,-10.35,0.42,3.99,4.66],"totalChange":4.66},"chaosEquivalent":2.64,"lowConfidencePaySparkLine":{"data":[0,0.13,0.05,0.37,0.41,1.71,2.08],"totalChange":2.08},"lowConfidenceReceiveSparkLine":{"data":[0,-2.76,-16.27,-10.35,0.42,3.99,4.66],"totalChange":4.66},"detailsId":"journeyman-cartographers-sextant"},"Blessing of Xoph":{"currencyTypeName":"Blessing of Xoph","pay":{"id":0,"league_id":1,"pay_currency_id":61,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":61,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":24,"value":2.483673469387755,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-33.33,-33.33,-33.33,-33.33,-9.93,-17.21],"totalChange":-17.21},"chaosEquivalent":2.24,"lowConfidencePaySparkLine":{"data":[null,null,0,100,100,100,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,-33.33,-33.33,-33.33,-33.33,-9.93,-17.21],"totalChange":-17.21},"detailsId":"blessing-of-xoph"},"Annulment Shard":{"currencyTypeName":"Annulment Shard","pay":{"id":0,"league_id":1,"pay_currency_id":79,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":1.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":79,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":3.8,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[],"totalChange":0},"chaosEquivalent":2.23,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0,-9.09,-9.09,1718.18,1718.18,245.45],"totalChange":245.45},"detailsId":"annulment-shard"},"Blessing of Tul":{"currencyTypeName":"Blessing of Tul","pay":{"id":0,"league_id":1,"pay_currency_id":62,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":62,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":15,"value":2,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,22.91,0,0,0],"totalChange":0},"chaosEquivalent":2,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,22.91,0,0,0],"totalChange":0},"detailsId":"blessing-of-tul"},"Vaal Orb":{"currencyTypeName":"Vaal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":8,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":40,"value":0.5834604444444444,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":8,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":81,"value":1.7833907142857144,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,3.03,3.03,3.03,3.03,3.03,3.87],"totalChange":3.87},"receiveSparkLine":{"data":[0,4.08,2.53,1.19,4.08,4.08,3.12],"totalChange":3.12},"chaosEquivalent":1.75,"lowConfidencePaySparkLine":{"data":[0,3.03,3.03,3.03,3.03,3.03,3.87],"totalChange":3.87},"lowConfidenceReceiveSparkLine":{"data":[0,4.08,2.53,1.19,4.08,4.08,3.12],"totalChange":3.12},"detailsId":"vaal-orb"},"Orb of Horizons":{"currencyTypeName":"Orb of Horizons","pay":{"id":0,"league_id":1,"pay_currency_id":75,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.958204,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":75,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":31,"value":1.79100045,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-6.68,5.03,-3.73,-4.13,-2.13,-4.61],"totalChange":-4.61},"chaosEquivalent":1.42,"lowConfidencePaySparkLine":{"data":[0,-0.33,0.72,4.29,0.72,-3.63,4.36],"totalChange":4.36},"lowConfidenceReceiveSparkLine":{"data":[0,-6.68,5.03,-3.73,-4.13,-2.13,-4.61],"totalChange":-4.61},"detailsId":"orb-of-horizons"},"Splinter of Chayula":{"currencyTypeName":"Splinter of Chayula","pay":{"id":0,"league_id":1,"pay_currency_id":60,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":3,"value":0.83333,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":60,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":46,"value":1.5,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,5.26,-9.67,0.7,-21.05,-21.05,-21.05],"totalChange":-21.05},"chaosEquivalent":1.35,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,5.26,-9.67,0.7,-21.05,-21.05,-21.05],"totalChange":-21.05},"detailsId":"splinter-of-chayula"},"Gemcutter\'s Prism":{"currencyTypeName":"Gemcutter\'s Prism","pay":{"id":0,"league_id":1,"pay_currency_id":15,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":14,"value":0.7885894949494949,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":15,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":74,"value":1.3104130434782608,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,-0.9,-0.9,-1.01,4.44,-0.9,4.73],"totalChange":4.73},"receiveSparkLine":{"data":[0,4.2,4.37,1.67,5.04,1.93,1.19],"totalChange":1.19},"chaosEquivalent":1.29,"lowConfidencePaySparkLine":{"data":[0,-0.9,-0.9,-1.01,4.44,-0.9,4.73],"totalChange":4.73},"lowConfidenceReceiveSparkLine":{"data":[0,4.2,4.37,1.67,5.04,1.93,1.19],"totalChange":1.19},"detailsId":"gemcutters-prism"},"Apprentice Cartographer\'s Sextant":{"currencyTypeName":"Apprentice Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":46,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":14,"value":0.9750981212121212,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":46,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":52,"value":1,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-5.02,-6.61,-3.17,-2.11,-3.38,-4.22],"totalChange":-4.22},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":1.01,"lowConfidencePaySparkLine":{"data":[0,-5.02,-6.61,-3.17,-2.11,-3.38,-4.22],"totalChange":-4.22},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"apprentice-cartographers-sextant"},"Orb of Regret":{"currencyTypeName":"Orb of Regret","pay":{"id":0,"league_id":1,"pay_currency_id":9,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":18,"value":1.0964574468085106,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":9,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":92,"value":1.0004330666666668,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0.84,0.94,0.31,0.11,0.32],"totalChange":0.32},"receiveSparkLine":{"data":[0,0,0,0,1.51,0,0.04],"totalChange":0.04},"chaosEquivalent":0.96,"lowConfidencePaySparkLine":{"data":[0,0,0.84,0.94,0.31,0.11,0.32],"totalChange":0.32},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,1.51,0,0.04],"totalChange":0.04},"detailsId":"orb-of-regret"},"Regal Orb":{"currencyTypeName":"Regal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":7,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":10,"value":1.3920958247422681,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":7,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":73,"value":0.8269064536082474,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0.04,0,0,0,0.12,0.57],"totalChange":0.57},"receiveSparkLine":{"data":[0,-0.09,-2.23,0.79,-1.6,1.46,0.7],"totalChange":0.7},"chaosEquivalent":0.77,"lowConfidencePaySparkLine":{"data":[0,0.04,0,0,0,0.12,0.57],"totalChange":0.57},"lowConfidenceReceiveSparkLine":{"data":[0,-0.09,-2.23,0.79,-1.6,1.46,0.7],"totalChange":0.7},"detailsId":"regal-orb"},"Engineer\'s Orb":{"currencyTypeName":"Engineer\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":77,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":3,"value":2.605612244897959,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":77,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":17,"value":0.8584277931034483,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,18.02,26.46,12.78,12.41,12.81,11.17],"totalChange":11.17},"chaosEquivalent":0.62,"lowConfidencePaySparkLine":{"data":[0,2,11.98,11.98,30.74,30.74,30.49],"totalChange":30.49},"lowConfidenceReceiveSparkLine":{"data":[0,18.02,26.46,12.78,12.41,12.81,11.17],"totalChange":11.17},"detailsId":"engineers-orb"},"Orb of Fusing":{"currencyTypeName":"Orb of Fusing","pay":{"id":0,"league_id":1,"pay_currency_id":5,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":1.95,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":5,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":0.55044,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0.78,0.62,0.54,2.53,2.56],"totalChange":2.56},"receiveSparkLine":{"data":[0,-0.93,-2.39,-0.55,-1.99,-1,-0.92],"totalChange":-0.92},"chaosEquivalent":0.53,"lowConfidencePaySparkLine":{"data":[0,0,0.78,0.62,0.54,2.53,2.56],"totalChange":2.56},"lowConfidenceReceiveSparkLine":{"data":[0,-0.93,-2.39,-0.55,-1.99,-1,-0.92],"totalChange":-0.92},"detailsId":"orb-of-fusing"},"Orb of Scouring":{"currencyTypeName":"Orb of Scouring","pay":{"id":0,"league_id":1,"pay_currency_id":14,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":2.1,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":14,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":91,"value":0.5354012105263158,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,4.55,4.55,4.55,5.09,8.71,9.52],"totalChange":9.52},"receiveSparkLine":{"data":[0,0,0,0,0,-0.56,7.08],"totalChange":7.08},"chaosEquivalent":0.51,"lowConfidencePaySparkLine":{"data":[0,4.55,4.55,4.55,5.09,8.71,9.52],"totalChange":9.52},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,-0.56,7.08],"totalChange":7.08},"detailsId":"orb-of-scouring"},"Cartographer\'s Chisel":{"currencyTypeName":"Cartographer\'s Chisel","pay":{"id":0,"league_id":1,"pay_currency_id":10,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":2.4,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":10,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":58,"value":0.46549529545454543,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-3.14,-3.14,0.9,0.9,0.9,0.9],"totalChange":0.9},"receiveSparkLine":{"data":[0,0.97,-2.18,1.69,-2.38,-1.15,-0.13],"totalChange":-0.13},"chaosEquivalent":0.44,"lowConfidencePaySparkLine":{"data":[0,-3.14,-3.14,0.9,0.9,0.9,0.9],"totalChange":0.9},"lowConfidenceReceiveSparkLine":{"data":[0,0.97,-2.18,1.69,-2.38,-1.15,-0.13],"totalChange":-0.13},"detailsId":"cartographers-chisel"},"Orb of Alchemy":{"currencyTypeName":"Orb of Alchemy","pay":{"id":0,"league_id":1,"pay_currency_id":4,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":2.841666666666667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":4,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":65,"value":0.35714,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-0.63,0.07,6.42,6.41,2.75,4.86],"totalChange":4.86},"receiveSparkLine":{"data":[0,2.66,-5.08,-7.82,-6.04,-6.22,-14.4],"totalChange":-14.4},"chaosEquivalent":0.35,"lowConfidencePaySparkLine":{"data":[0,-0.63,0.07,6.42,6.41,2.75,4.86],"totalChange":4.86},"lowConfidenceReceiveSparkLine":{"data":[0,2.66,-5.08,-7.82,-6.04,-6.22,-14.4],"totalChange":-14.4},"detailsId":"orb-of-alchemy"},"Silver Coin":{"currencyTypeName":"Silver Coin","pay":{"id":0,"league_id":1,"pay_currency_id":12,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":15,"value":3.6,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":12,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.3146063292682927,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,5.33,2.76,0.91,2.92,3.72,3.72],"totalChange":3.72},"receiveSparkLine":{"data":[0,-8.82,-8.94,-8.94,-8.94,2.68,0.27],"totalChange":0.27},"chaosEquivalent":0.3,"lowConfidencePaySparkLine":{"data":[0,5.33,2.76,0.91,2.92,3.72,3.72],"totalChange":3.72},"lowConfidenceReceiveSparkLine":{"data":[0,-8.82,-8.94,-8.94,-8.94,2.68,0.27],"totalChange":0.27},"detailsId":"silver-coin"},"Blessed Orb":{"currencyTypeName":"Blessed Orb","pay":{"id":0,"league_id":1,"pay_currency_id":18,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":10,"value":3.7901630434782607,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":18,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":53,"value":0.32171585542168674,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.1,0.06,0.06,0.7,0.23,0.25],"totalChange":0.25},"receiveSparkLine":{"data":[0,0,-1.04,-1.47,-1.55,0,-3.48],"totalChange":-3.48},"chaosEquivalent":0.29,"lowConfidencePaySparkLine":{"data":[0,0.1,0.06,0.06,0.7,0.23,0.25],"totalChange":0.25},"lowConfidenceReceiveSparkLine":{"data":[0,0,-1.04,-1.47,-1.55,0,-3.48],"totalChange":-3.48},"detailsId":"blessed-orb"},"Chromatic Orb":{"currencyTypeName":"Chromatic Orb","pay":{"id":0,"league_id":1,"pay_currency_id":17,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":30,"value":3.900757575757576,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":17,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":91,"value":0.27702283333333333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-1.17,-1.9,-0.9,-0.75,0.03,0.01],"totalChange":0.01},"receiveSparkLine":{"data":[0,-1.38,-1.35,-2.08,-2.08,-2.08,-2.35],"totalChange":-2.35},"chaosEquivalent":0.27,"lowConfidencePaySparkLine":{"data":[0,-1.17,-1.9,-0.9,-0.75,0.03,0.01],"totalChange":0.01},"lowConfidenceReceiveSparkLine":{"data":[0,-1.38,-1.35,-2.08,-2.08,-2.08,-2.35],"totalChange":-2.35},"detailsId":"chromatic-orb"},"Orb of Binding":{"currencyTypeName":"Orb of Binding","pay":{"id":0,"league_id":1,"pay_currency_id":74,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":6,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":74,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":28,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":0.25,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"orb-of-binding"},"Splinter of Xoph":{"currencyTypeName":"Splinter of Xoph","pay":{"id":0,"league_id":1,"pay_currency_id":56,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":8,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":56,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":29,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-5.08,-14.97,8.86,-18.21,-14.21,-20.82],"totalChange":-20.82},"chaosEquivalent":0.23,"lowConfidencePaySparkLine":{"data":[null,null,0,14.29,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,-5.08,-14.97,8.86,-18.21,-14.21,-20.82],"totalChange":-20.82},"detailsId":"splinter-of-xoph"},"Splinter of Uul-Netol":{"currencyTypeName":"Splinter of Uul-Netol","pay":{"id":0,"league_id":1,"pay_currency_id":59,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":15,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":59,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,1.07,1.07,1.07,1.07,1.07,1.07],"totalChange":1.07},"chaosEquivalent":0.2,"lowConfidencePaySparkLine":{"data":[null,null,0,50,50,50,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,1.07,1.07,1.07,1.07,1.07,1.07],"totalChange":1.07},"detailsId":"splinter-of-uul-netol"},"Orb of Alteration":{"currencyTypeName":"Orb of Alteration","pay":{"id":0,"league_id":1,"pay_currency_id":6,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":32,"value":6.897234042553191,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":6,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":61,"value":0.14286,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,3.09,4.16,5.69,9.14,5.69,4.2],"totalChange":4.2},"receiveSparkLine":{"data":[0,-0.03,-0.5,-0.41,-0.73,0,0],"totalChange":0},"chaosEquivalent":0.14,"lowConfidencePaySparkLine":{"data":[0,3.09,4.16,5.69,9.14,5.69,4.2],"totalChange":4.2},"lowConfidenceReceiveSparkLine":{"data":[0,-0.03,-0.5,-0.41,-0.73,0,0],"totalChange":0},"detailsId":"orb-of-alteration"},"Jeweller\'s Orb":{"currencyTypeName":"Jeweller\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":11,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":24,"value":7.8,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":11,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":75,"value":0.13261883720930231,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.3,1.86,3.61,3.33,4.92,6.27],"totalChange":6.27},"receiveSparkLine":{"data":[0,-1.86,1.35,-2.11,-3.08,-1.86,-2.39],"totalChange":-2.39},"chaosEquivalent":0.13,"lowConfidencePaySparkLine":{"data":[0,0.3,1.86,3.61,3.33,4.92,6.27],"totalChange":6.27},"lowConfidenceReceiveSparkLine":{"data":[0,-1.86,1.35,-2.11,-3.08,-1.86,-2.39],"totalChange":-2.39},"detailsId":"jewellers-orb"},"Orb of Chance":{"currencyTypeName":"Orb of Chance","pay":{"id":0,"league_id":1,"pay_currency_id":16,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":7,"value":8.64997340425532,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":16,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":76,"value":0.11111,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-3.04,0.02,0.72,-0.25,-0.36,7.21],"totalChange":7.21},"receiveSparkLine":{"data":[0,0,1.83,0,-2.24,0,-5.56],"totalChange":-5.56},"chaosEquivalent":0.11,"lowConfidencePaySparkLine":{"data":[0,-3.04,0.02,0.72,-0.25,-0.36,7.21],"totalChange":7.21},"lowConfidenceReceiveSparkLine":{"data":[0,0,1.83,0,-2.24,0,-5.56],"totalChange":-5.56},"detailsId":"orb-of-chance"},"Glassblower\'s Bauble":{"currencyTypeName":"Glassblower\'s Bauble","pay":{"id":0,"league_id":1,"pay_currency_id":19,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":15.31340206185567,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":19,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":51,"value":0.14286,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-0.12,0,1.2,2.08,3.07,3.07],"totalChange":3.07},"chaosEquivalent":0.1,"lowConfidencePaySparkLine":{"data":[0,0,-1.94,3.94,3.9,3.9,9.05],"totalChange":9.05},"lowConfidenceReceiveSparkLine":{"data":[0,-0.12,0,1.2,2.08,3.07,3.07],"totalChange":3.07},"detailsId":"glassblowers-bauble"},"Splinter of Tul":{"currencyTypeName":"Splinter of Tul","pay":{"id":0,"league_id":1,"pay_currency_id":57,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":20,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":57,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":23,"value":0.14089376744186047,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,4.1,4.81,5.81,5.86,9.04,18.99],"totalChange":18.99},"chaosEquivalent":0.1,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,4.1,4.81,5.81,5.86,9.04,18.99],"totalChange":18.99},"detailsId":"splinter-of-tul"},"Splinter of Esh":{"currencyTypeName":"Splinter of Esh","pay":{"id":0,"league_id":1,"pay_currency_id":58,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":20,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":58,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":29,"value":0.1326773181818182,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0.47,0.74,8.18,8.18,8.18,0.47],"totalChange":0.47},"chaosEquivalent":0.09,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0.47,0.74,8.18,8.18,8.18,0.47],"totalChange":0.47},"detailsId":"splinter-of-esh"},"Orb of Augmentation":{"currencyTypeName":"Orb of Augmentation","pay":{"id":0,"league_id":1,"pay_currency_id":20,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":5,"value":42.121212121212125,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":20,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.035082486842105264,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[null,null,null,null,null,null,0],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,1.83,5.26],"totalChange":5.26},"chaosEquivalent":0.03,"lowConfidencePaySparkLine":{"data":[0,-45.46,-46.56,-41.35,-39.88,-39.88,-42.9],"totalChange":-42.9},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,1.83,5.26],"totalChange":5.26},"detailsId":"orb-of-augmentation"},"Blacksmith\'s Whetstone":{"currencyTypeName":"Blacksmith\'s Whetstone","pay":{"id":0,"league_id":1,"pay_currency_id":25,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":137.4747474747475,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":25,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":38,"value":0.024965935064935066,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,21.31,20.44,18.01,21.49,17.2,20.28],"totalChange":20.28},"receiveSparkLine":{"data":[0,-12.72,-18.33,-18.7,-16.53,-16.53,-16.64],"totalChange":-16.64},"chaosEquivalent":0.02,"lowConfidencePaySparkLine":{"data":[0,21.31,20.44,18.01,21.49,17.2,20.28],"totalChange":20.28},"lowConfidenceReceiveSparkLine":{"data":[0,-12.72,-18.33,-18.7,-16.53,-16.53,-16.64],"totalChange":-16.64},"detailsId":"blacksmiths-whetstone"},"Perandus Coin":{"currencyTypeName":"Perandus Coin","pay":{"id":0,"league_id":1,"pay_currency_id":13,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":200,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":13,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":0.011368279569892474,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,2.35,-7.37,-12.56,-16.67,-10.22,-4.79],"totalChange":-4.79},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0.22,-2.43,-4.97,-4.97,2.72,2.72],"totalChange":2.72},"lowConfidenceReceiveSparkLine":{"data":[0,2.35,-7.37,-12.56,-16.67,-10.22,-4.79],"totalChange":-4.79},"detailsId":"perandus-coin"},"Orb of Transmutation":{"currencyTypeName":"Orb of Transmutation","pay":{"id":0,"league_id":1,"pay_currency_id":21,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":196.62,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":21,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":53,"value":0.01613,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0,null,21.78,21.78,null,null],"totalChange":21.78},"receiveSparkLine":{"data":[0,0,-0.42,-0.12,-2.46,-5.76,-3.24],"totalChange":-3.24},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0,-1.33,21.78,21.78,22.08,22.06],"totalChange":22.06},"lowConfidenceReceiveSparkLine":{"data":[0,0,-0.42,-0.12,-2.46,-5.76,-3.24],"totalChange":-3.24},"detailsId":"orb-of-transmutation"},"Portal Scroll":{"currencyTypeName":"Portal Scroll","pay":{"id":0,"league_id":1,"pay_currency_id":24,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":364.8484848484849,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":24,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":38,"value":0.014209822916666667,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,-0.12,-4.8,-4.8,-14.76],"totalChange":-14.76},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,-23.5,14.82,46.05,46.05,52.82,76.13],"totalChange":76.13},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,-0.12,-4.8,-4.8,-14.76],"totalChange":-14.76},"detailsId":"portal-scroll"},"Armourer\'s Scrap":{"currencyTypeName":"Armourer\'s Scrap","pay":{"id":0,"league_id":1,"pay_currency_id":26,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":6,"value":197.55050505050505,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":26,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":0.02,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[null,null,null,0,0,null,4.57],"totalChange":4.57},"receiveSparkLine":{"data":[0,0.72,1.65,10.01,9.9,10.01,10.01],"totalChange":10.01},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0,1.53,0.71,0.71,1.73,5.31],"totalChange":5.31},"lowConfidenceReceiveSparkLine":{"data":[0,0.72,1.65,10.01,9.9,10.01,10.01],"totalChange":10.01},"detailsId":"armourers-scrap"}},"updated":1548166976379}');
  var DEBUG = false;
  
  var DELAY = 0;

  var fontsCSS = GM_getResourceText ("fontsCSS");
  GM_addStyle (fontsCSS);
  GM_addStyle(`.gs-style-enabler .gs-frame,.gs-style-enabler .gs-style{background-color:#e8eff2;border:1px dashed #111;border-radius:5px;padding:5px}.gs-style-enabler .gs-style{background-color:#e8eff2;color:#222;padding:1px 2px}.gs-style-enabler .gs-style a{color:#09c;text-decoration:underline dashed}.gs-style-enabler .gs-style.gs-warning{color:#856404;background-color:#fff3cd;border-color:#856404}.gs-style-enabler .gs-style.gs-button{margin-right:5px;padding:2px 5px}.gs-style-enabler .gs-style-light{font-size:.8em;font-style:italic;opacity:.9;background-color:#fff;line-height:1.2em}.gs-style-enabler .gs-style-light.gs-style{padding:1px 5px}.gs-style a,a.gs-style{cursor:pointer}body.frame-setting-frame{background-color:#e8eff2}a i.fas{cursor:pointer}.gs-frame{width:90%;min-height:300px;max-width:900px;height:85%;position:fixed;left:50%;transform:translateX(-50%);top:7.5%;z-index:100001}.gs-backdrop{width:100%;min-height:300px;height:100%;position:fixed;left:0;top:0;z-index:100000;background:rgba(255,255,255,.3)}.hide{display:none}.nowrap{white-space:nowrap}.gs-pull-right{float:right}.gs-pull-left{float:left}.tippy-content a{color:#222}.patreon-button img{height:47px;border-radius:1.5rem}.paypal-form{padding-bottom:0;margin-bottom:-6px}#saved-alert{position:fixed;z-index:0;padding-left:0;padding-right:30px}.modal-dialog.modal-xl{max-width:90%}.gs-loading{width:300px;height:300px;position:fixed;left:50%;top:50%;z-index:100001;transform:translateX(-50%) translateY(-50%)}@-webkit-keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@-moz-keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}.gs-loading-spinner{width:30px;height:30px;position:fixed;left:135px;top:135px;z-index:100001;-webkit-animation-duration:.75s;-moz-animation-duration:.75s;animation-duration:.75s;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:rotate-forever;-moz-animation-name:rotate-forever;animation-name:rotate-forever;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;animation-timing-function:linear;border:8px solid #222;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;border-radius:50%;display:inline-block}.gs-loading-spinner.gs-loaded-half{border-right-color:#222}.gs-loading-spinner.gs-loaded-three-quarters{border-right-color:#222;border-bottom-color:#222}.gs-loading-spinner.gs-loaded-full{border-right-color:#222;border-bottom-color:#222;border-left-color:#222}.gs-loading-counter,.gs-loading-title{position:fixed;width:296px;padding:0 5px;text-align:center;font-weight:700;font-style:italic}.gs-loading-title{top:10px}.gs-loading-counter{bottom:10px}`);
  GM_addStyle(`body,html{height:100%}.currencyClicked{font-style:italic}.item .real-sort:hover{background:#000}.grouped-only,.proplist li.grouped-only{display:none}.grouped .grouped-only,.grouped .proplist li.grouped-only{display:inline}.marg-b-5{margin-bottom:5px}.marg-l-5{margin-left:5px}.marg-lr-8{margin-left:8px;margin-right:8px}.title a.gs-style{padding:3px 5px;font-size:12px;line-height:12px;top:-6px;position:relative}.chaosEquiv,.gs-item-handle{margin-left:5px;padding:1px 2px;border:1px solid #fff;border-radius:5px;white-space:nowrap}.grouped .resultset .row.gs-group-member{display:none}.gs-style-enabler .title a.gs-style{color:#222}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle,.gs-style-enabler .tippy-backdrop{background-color:#e8eff2;border:1px dashed #111;border-radius:5px}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle,.gs-style-enabler .tippy-content{background-color:#e8eff2;color:#222}.gs-style-enabler a.gs-style:focus,.gs-style-enabler a.gs-style:hover{color:#222}.gs-style-enabler .gs-style{padding:1px 2px}.gs-style-enabler .gs-style.wiki-link{padding:0 2px}.gs-style-enabler .gs-style,.gs-style-enabler .tippy-content{font-family:Roboto,sans-serif}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle{font-family:Oswald,sans-serif}.gs-style-enabler .item .real-sort.gs-style:hover{color:#fff}.gs-style-enabler tr.cell-second td.gs-style,.gs-style-enabler tr.cell-second th.gs-style{background-color:#e8eff2}.gs-style-enabler tr.cell-second th.gs-style{border-bottom:none;border-bottom-left-radius:0;border-bottom-right-radius:0}.gs-style-enabler tr.cell-second td.gs-style{border-top:none;border-top-left-radius:0;border-top-right-radius:0}.gs-style-enabler .hide{display:none}.gs-style-enabler .nowrap{white-space:nowrap}.gs-style-enabler .tippy-content a{color:#222}.gs-style-enabler .form-group.disabled label{color:#6c757d}.gs-load.gs-style,.gs-multi.gs-style,.gs-save.gs-style{margin-left:7px}.live-search-box.alert-box .gs-load.gs-style,.live-search-box.alert-box .gs-multi.gs-style,.live-search-box.alert-box .gs-save.gs-style{margin-left:0;margin-right:7px}.gs-save.gs-style{padding:0 7px}.gs-load.gs-style{padding:0 5px}.gs-multi.gs-style{padding:0 6px}.tippy-content a{color:#fff}.currencySettings .itemSettingsOnly,.itemSettings .currencySettingsOnly{display:none}.curr-table img{height:22px}.poeOffSite .alert-box.live-search{margin:3px 8px;font-weight:700}.poeOffSite.gs-style-enabler #trade .gs-style a,.poeOffSite.gs-style-enabler #trade .gs-style-light a{color:#09c}.poeOffSite.gs-style-enabler .gs-style-light{font-size:.9em}.poeOffSite.gs-style-enabler div.gs-wrapper{line-height:32px}.poeOffSite.gs-search-tab .gs-multi.hide{display:inline!important}.poeOffSite.gs-exchange-tab .copied{font-style:italic}.poeOffSite.gs-exchange-tab .copied:after{content:' copied'}.poeOffSite #trade .results .search-bar .details .price .gs-wrapper img,.poeOffSite .results #trade .search-bar .details .price .gs-wrapper img,.poeOffSite .results .row .details .price .gs-wrapper img{width:22px;vertical-align:sub}.poeOffSite .linkBack{min-width:359px}.poeOffSite .nav-tabs .pteSettings{height:32px;float:right}.poeOffSite .chaosEquiv,.poeOffSite .gs-item-handle{padding:3px 7px;cursor:pointer}.poeOffSite .tippy-content{font-size:1.6em}.poeOffSite .tippy-content .currency-image img{width:22px}.poeOffSite .gs-load.gs-style,.poeOffSite .gs-multi.gs-style,.poeOffSite .gs-save.gs-style{cursor:pointer}.poeOffSite .controls .gs-load,.poeOffSite .controls .gs-multi,.poeOffSite .controls .gs-save{margin-left:0;margin-right:5px}.poeOffSite #trade .controls.saveManager .controls-left{width:25%!important}.poeOffSite #trade .controls.saveManager .controls-right{width:45%!important}.poeOffSite #trade .controls.saveManager .controls-center{width:30%!important}@media (max-width:800px){.poeOffSite #trade .controls.saveManager .controls-left{width:50%!important}.poeOffSite #trade .controls.saveManager .controls-right{width:100%!important}.poeOffSite #trade .controls.saveManager .controls-center{width:50%!important}}.alert-box.live-search{padding:3px 5px}#ms-console-tip{text-align:left}.gs-danger{color:#dc3545!important}.gs-info{color:#17a2b8!important}.gs-warning{color:#856404!important}.gs-success{color:#28a745!important}.gs-quote{color:#6c757d!important;font-style:italic}.middle-list{padding-top:90px;padding-bottom:90px}.frame-load-frame .fixed-bottom,.frame-load-frame .fixed-top,.frame-multi-frame .fixed-bottom,.frame-multi-frame .fixed-top{background:rgba(255,255,255,.95)}.frame-load-frame .table-responsive,.frame-multi-frame .table-responsive{overflow-x:visible}`);
  GM_addStyle(`.colorPicker{width:16px;height:16px;position:relative;clear:both;margin:0}.colorPicker .track{background:#efefef url(https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/text-color.png) no-repeat 50% 50%;background-image:url(https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/text-color.png);height:150px;width:150px;padding:0;position:absolute;cursor:crosshair;float:left;left:-67px;top:-67px;display:none;border:1px solid #ccc;z-index:10;-webkit-border-radius:150px;-moz-border-radius:150px;border-radius:150px}.colorPicker .color{width:16px;height:16px;padding:0;border:1px solid #ccc;display:block;position:relative;z-index:11;background-color:#efefef;-webkit-border-radius:27px;-moz-border-radius:27px;border-radius:27px;cursor:pointer}.colorPicker .colorInner{width:14px;height:14px;-webkit-border-radius:27px;-moz-border-radius:27px;border-radius:27px}.colorPicker .dropdown{list-style:none;display:none;width:27px;position:absolute;top:28px;border:1px solid #ccc;left:0;z-index:1000}.colorPicker .dropdown li{height:25px;cursor:pointer}`);

  var ITEM_SEARCH_CONTAINER = '#search-results-first', ITEM_SEARCH_SELECTOR = 'tbody.item', CURR_SEARCH_CONTAINER = '#content', CURR_SEARCH_SELECTOR = 'div.displayoffer';
var resources = [], cssUrls = ["https://use.fontawesome.com/releases/v5.6.0/css/all.css"], jsUrls = [];
/*"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
"https://unpkg.com/tippy.js@3/dist/tippy.all.min.js",
"https://code.jquery.com/jquery-1.11.3.min.js",
"https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.2/bootstrap3-typeahead.min.js",
"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/js/bootstrap.min.js"*/
var settingsIcon;

var addSettingsIconAndCommonInit = function(loc) {
  doOverrides();
  settingsIcon = $(`<a class="gs-style gs-fixTips gs-settings gs-pull-right" onclick="" data-tippy="POE Trade Enhancer settings">PTE <i class="fas fa-cog fa-spin"></i></a>`);
  $('.linkBack').append(settingsIcon);
  tippy(settingsIcon[0], {content: "POE Trade Enhancer settings"});
  $('body').addClass('poeOffSite');
  getAvailableLeagues();
};


var shortDescriptionParagraph = /* html */`
<p class="lead">
  <strong>Adds tons of usefull features to pathofexile.com/trade, from a very easy to use save manager to save and laod your searches and even live search them all in one page, to an auto sort by real currency values (from poe.ninja), passing from gems max quality cost and more. I have some other very good idea for features to add, I'll gladly push them forward if I see people start using this.</strong>
  <br /><em><a href="https://github.com/ghostscript3r/poe-trade-official-site-enhancer">github page</a></em>
</p>
`

var roadmapParagraph = /* html */`
<div class="">
  <h3 class="">Roadmap</h3>
  <p class="lead">
    I'd like to see some votes before starting on new features. I already put some ideas there, but I'd like to see more from you. If nothing appens there, the next thing will probably be a smart mod and ranges selector based on poe.affix values, because choosing a mod that gives no results because the mod for the type of item I'm searching is spelled slightly differente is one of the things I find more frustrating of this interface.
    <br />
    <br />
    <a href="https://www.tricider.com/admin/36HWcTk5RhZ/DawSV0oQX7b" target="_blank">New features request and vote</a>
    <br />
    <a href="https://trello.com/b/x77l2HzX/poe-trade-enhancer" target="_blank">Project board</a>
  </p>
</div>
`

var issueTrackingParagraph = /* html */`
<div class="">
  <h3 class="">Issue tracking</h3>
  <p class="lead">
    <a href="https://github.com/ghostscript3r/poe-trade-official-site-enhancer/issues" target="_blank">Issue tracking page</a><br />
    <em>Use only GitHub please. The other repositories section will be monitored occasionally at best. Also avoid sending bug report directly to my mail, there's a very high probability they'll just be ignored that way.</em>
  </p>
</div>
`

var changeLogParagraph = /* html */`
<div class="">
  <h3 class="">Changelog & Releases</h3>
  <p><a href="https://github.com/ghostscript3r/poe-trade-official-site-enhancer/releases" target="_blank">GitHub Changelog</a></p>
</div>
`
var licenseParagraph = /* html */`
<div class="">
  <h3 class="">License</h3>
  <p><a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">https://creativecommons.org/licenses/by-sa/4.0/</a></p>
</div>
`

var repositoriesParagraph = /* html */`
<div class="">
  <h3 class="">Repositories</h3>
  <p>
    <a href="https://github.com/ghostscript3r/poe-trade-official-site-enhancer" target="_blank">GitHub</a><br />
    <a href="https://greasyfork.org/scripts/389702-poe-trade-official-site-enhancer" target="_blank">GreasyFork</a><br />
    <a href="https://openuserjs.org/scripts/ghostscript3r/poe-trade-official-site-enhancer" target="_blank">OpenUserJS</a>
  </p>
</div>
`

var ghostscripterParagraph = /* html */`
<div class="">
  <h2 class="">GhostScripter</h2>
  <p>I started enhancing pages using Userscripts (Tampermonkey/Greasemonkey) for myself and some friends. I always found very frustrating when a site I use very often makes me click around for tasks that should be done with one click. And since I'm a web developer discovering that I could easily enhance all those sites has literally opened a new world to me.</p>
  <p>First works where crude but very effective in solving minor problems and unusabilities of various sites and apps.</p>
  <p>Now I decided to polish and publish the most usefull of them and start taking request on larger scale.</p>
  <p>Basically I want to fight frustration, a big monster that permeates the internet.</p>
  <p>Basically if there's a site or web application with some annoying behaviours (5 clicks when you would like to do just 1, that sort of things), <a href="https://www.tricider.com/admin/35BH7CcohrB/EFXf0Ei7SjR" target="_blank">try to ask for a new userscript here</a>. It might be much easier then you think. Obviously patron and supporters requests will "bear more weight"... I do not guarantee that if you donate I will answer your request ASAP. Many factors will determine what to do next, like complexity of the request, prioritization of bugfixes, personal life, etcetera... But I'm pretty sure that any supporter request will be given a lot of attention. For this reason if you are a patron you would probably do better by directly writing to me at <a href="mailto:ghostscript3r@gmail.com">ghostscript3r@gmail.com</a>.</p>
  <p>For a list of all projects published or planned visit <a href="https://www.patreon.com/ghostscripter" target="_blank">my patreon page</a>.</p>
</div>
`
var donateParagraph = /* html */`
<p class="mt-3 mb-0 plr-1 text-center text-info font-italic">
  If you like this script and wish it's kept working or wish new features to be added, consider contributing somehow.<br />
  Consider that by nature UserScripts need maintenance. I will never have any control on how or when the site I'm modifing will change. I try to develop theese scripts as smart as possible so that if anything changes they at least don't make the original unusable, but as the site changes the script will need to adapt to continue working. So if you find this usefull and wish to continue using it, really consider supporting me. If no one will, I'm pretty sure I will abandon theese projects sooner or later, and after that it's only a matter of time before it stop working.<br />
  If not with a donation you can contribute by reccomending it to your friends, or even just by requesting new features or scripts, that might in turn attract new users.<br />
  Check my page on <a target="_top" href="https://www.patreon.com/ghostscripter">Patreon</a> and follow directions from there on how to request new features.
</p>
`

var frameTemplate = /* html */`
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald|Roboto" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.0/css/all.css" crossorigin="anonymous" />
  <script>
    var fr = document.getElementById('settings-frame');
    var doc = document;
    if (fr) doc = fr.document || fr.contentDocument || fr.contentWindow.document;
    var scripts = [
      // "https://code.jquery.com/jquery-1.11.3.min.js",
      // "https://greasyfork.org/scripts/387585-jqueryeditable/code/jqueryeditable.js?version=717975",
      // "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
      // "https://unpkg.com/tippy.js@3/dist/tippy.all.min.js",
      // "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/js/bootstrap.min.js"
    ];
    var i = 0;

    var writeScript = function() {
      var s = doc.createElement("script");
      s.type = "text/javascript";
      s.src = scripts[i];
      i++;
      s.onload = loop;
      doc.head.appendChild(s);
    }
    var loop = function() {
      // console.log(window);
      if (i < scripts.length) {
        writeScript();
      } else {
        // setTimeout(function(){
        //   console.log("END");
        //   console.log(window);
        //   console.log(typeof $().modal);
        // }, 3000);
      }
    };
    loop();
  </script>
  <style>.gs-style-enabler .gs-frame,.gs-style-enabler .gs-style{background-color:#e8eff2;border:1px dashed #111;border-radius:5px;padding:5px}.gs-style-enabler .gs-style{background-color:#e8eff2;color:#222;padding:1px 2px}.gs-style-enabler .gs-style a{color:#09c;text-decoration:underline dashed}.gs-style-enabler .gs-style.gs-warning{color:#856404;background-color:#fff3cd;border-color:#856404}.gs-style-enabler .gs-style.gs-button{margin-right:5px;padding:2px 5px}.gs-style-enabler .gs-style-light{font-size:.8em;font-style:italic;opacity:.9;background-color:#fff;line-height:1.2em}.gs-style-enabler .gs-style-light.gs-style{padding:1px 5px}.gs-style a,a.gs-style{cursor:pointer}body.frame-setting-frame{background-color:#e8eff2}a i.fas{cursor:pointer}.gs-frame{width:90%;min-height:300px;max-width:900px;height:85%;position:fixed;left:50%;transform:translateX(-50%);top:7.5%;z-index:100001}.gs-backdrop{width:100%;min-height:300px;height:100%;position:fixed;left:0;top:0;z-index:100000;background:rgba(255,255,255,.3)}.hide{display:none}.nowrap{white-space:nowrap}.gs-pull-right{float:right}.gs-pull-left{float:left}.tippy-content a{color:#222}.patreon-button img{height:47px;border-radius:1.5rem}.paypal-form{padding-bottom:0;margin-bottom:-6px}#saved-alert{position:fixed;z-index:0;padding-left:0;padding-right:30px}.modal-dialog.modal-xl{max-width:90%}.gs-loading{width:300px;height:300px;position:fixed;left:50%;top:50%;z-index:100001;transform:translateX(-50%) translateY(-50%)}@-webkit-keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@-moz-keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}.gs-loading-spinner{width:30px;height:30px;position:fixed;left:135px;top:135px;z-index:100001;-webkit-animation-duration:.75s;-moz-animation-duration:.75s;animation-duration:.75s;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:rotate-forever;-moz-animation-name:rotate-forever;animation-name:rotate-forever;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;animation-timing-function:linear;border:8px solid #222;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;border-radius:50%;display:inline-block}.gs-loading-spinner.gs-loaded-half{border-right-color:#222}.gs-loading-spinner.gs-loaded-three-quarters{border-right-color:#222;border-bottom-color:#222}.gs-loading-spinner.gs-loaded-full{border-right-color:#222;border-bottom-color:#222;border-left-color:#222}.gs-loading-counter,.gs-loading-title{position:fixed;width:296px;padding:0 5px;text-align:center;font-weight:700;font-style:italic}.gs-loading-title{top:10px}.gs-loading-counter{bottom:10px}</style>
  <style>body,html{height:100%}.currencyClicked{font-style:italic}.item .real-sort:hover{background:#000}.grouped-only,.proplist li.grouped-only{display:none}.grouped .grouped-only,.grouped .proplist li.grouped-only{display:inline}.marg-b-5{margin-bottom:5px}.marg-l-5{margin-left:5px}.marg-lr-8{margin-left:8px;margin-right:8px}.title a.gs-style{padding:3px 5px;font-size:12px;line-height:12px;top:-6px;position:relative}.chaosEquiv,.gs-item-handle{margin-left:5px;padding:1px 2px;border:1px solid #fff;border-radius:5px;white-space:nowrap}.grouped .resultset .row.gs-group-member{display:none}.gs-style-enabler .title a.gs-style{color:#222}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle,.gs-style-enabler .tippy-backdrop{background-color:#e8eff2;border:1px dashed #111;border-radius:5px}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle,.gs-style-enabler .tippy-content{background-color:#e8eff2;color:#222}.gs-style-enabler a.gs-style:focus,.gs-style-enabler a.gs-style:hover{color:#222}.gs-style-enabler .gs-style{padding:1px 2px}.gs-style-enabler .gs-style.wiki-link{padding:0 2px}.gs-style-enabler .gs-style,.gs-style-enabler .tippy-content{font-family:Roboto,sans-serif}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle{font-family:Oswald,sans-serif}.gs-style-enabler .item .real-sort.gs-style:hover{color:#fff}.gs-style-enabler tr.cell-second td.gs-style,.gs-style-enabler tr.cell-second th.gs-style{background-color:#e8eff2}.gs-style-enabler tr.cell-second th.gs-style{border-bottom:none;border-bottom-left-radius:0;border-bottom-right-radius:0}.gs-style-enabler tr.cell-second td.gs-style{border-top:none;border-top-left-radius:0;border-top-right-radius:0}.gs-style-enabler .hide{display:none}.gs-style-enabler .nowrap{white-space:nowrap}.gs-style-enabler .tippy-content a{color:#222}.gs-style-enabler .form-group.disabled label{color:#6c757d}.gs-load.gs-style,.gs-multi.gs-style,.gs-save.gs-style{margin-left:7px}.live-search-box.alert-box .gs-load.gs-style,.live-search-box.alert-box .gs-multi.gs-style,.live-search-box.alert-box .gs-save.gs-style{margin-left:0;margin-right:7px}.gs-save.gs-style{padding:0 7px}.gs-load.gs-style{padding:0 5px}.gs-multi.gs-style{padding:0 6px}.tippy-content a{color:#fff}.currencySettings .itemSettingsOnly,.itemSettings .currencySettingsOnly{display:none}.curr-table img{height:22px}.poeOffSite .alert-box.live-search{margin:3px 8px;font-weight:700}.poeOffSite.gs-style-enabler #trade .gs-style a,.poeOffSite.gs-style-enabler #trade .gs-style-light a{color:#09c}.poeOffSite.gs-style-enabler .gs-style-light{font-size:.9em}.poeOffSite.gs-style-enabler div.gs-wrapper{line-height:32px}.poeOffSite.gs-search-tab .gs-multi.hide{display:inline!important}.poeOffSite.gs-exchange-tab .copied{font-style:italic}.poeOffSite.gs-exchange-tab .copied:after{content:' copied'}.poeOffSite #trade .results .search-bar .details .price .gs-wrapper img,.poeOffSite .results #trade .search-bar .details .price .gs-wrapper img,.poeOffSite .results .row .details .price .gs-wrapper img{width:22px;vertical-align:sub}.poeOffSite .linkBack{min-width:359px}.poeOffSite .nav-tabs .pteSettings{height:32px;float:right}.poeOffSite .chaosEquiv,.poeOffSite .gs-item-handle{padding:3px 7px;cursor:pointer}.poeOffSite .tippy-content{font-size:1.6em}.poeOffSite .tippy-content .currency-image img{width:22px}.poeOffSite .gs-load.gs-style,.poeOffSite .gs-multi.gs-style,.poeOffSite .gs-save.gs-style{cursor:pointer}.poeOffSite .controls .gs-load,.poeOffSite .controls .gs-multi,.poeOffSite .controls .gs-save{margin-left:0;margin-right:5px}.poeOffSite #trade .controls.saveManager .controls-left{width:25%!important}.poeOffSite #trade .controls.saveManager .controls-right{width:45%!important}.poeOffSite #trade .controls.saveManager .controls-center{width:30%!important}@media (max-width:800px){.poeOffSite #trade .controls.saveManager .controls-left{width:50%!important}.poeOffSite #trade .controls.saveManager .controls-right{width:100%!important}.poeOffSite #trade .controls.saveManager .controls-center{width:50%!important}}.alert-box.live-search{padding:3px 5px}#ms-console-tip{text-align:left}.gs-danger{color:#dc3545!important}.gs-info{color:#17a2b8!important}.gs-warning{color:#856404!important}.gs-success{color:#28a745!important}.gs-quote{color:#6c757d!important;font-style:italic}.middle-list{padding-top:90px;padding-bottom:90px}.frame-load-frame .fixed-bottom,.frame-load-frame .fixed-top,.frame-multi-frame .fixed-bottom,.frame-multi-frame .fixed-top{background:rgba(255,255,255,.95)}.frame-load-frame .table-responsive,.frame-multi-frame .table-responsive{overflow-x:visible}</style>
  <style>.colorPicker{width:16px;height:16px;position:relative;clear:both;margin:0}.colorPicker .track{background:#efefef url(https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/text-color.png) no-repeat 50% 50%;background-image:url(https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/text-color.png);height:150px;width:150px;padding:0;position:absolute;cursor:crosshair;float:left;left:-67px;top:-67px;display:none;border:1px solid #ccc;z-index:10;-webkit-border-radius:150px;-moz-border-radius:150px;border-radius:150px}.colorPicker .color{width:16px;height:16px;padding:0;border:1px solid #ccc;display:block;position:relative;z-index:11;background-color:#efefef;-webkit-border-radius:27px;-moz-border-radius:27px;border-radius:27px;cursor:pointer}.colorPicker .colorInner{width:14px;height:14px;-webkit-border-radius:27px;-moz-border-radius:27px;border-radius:27px}.colorPicker .dropdown{list-style:none;display:none;width:27px;position:absolute;top:28px;border:1px solid #ccc;left:0;z-index:1000}.colorPicker .dropdown li{height:25px;cursor:pointer}</style>
`;

var donateTemplate = /* html */`
<div class="card">
  <div class="card-body">
    <h3 class="text-center card-title">Please consider donating</h3>
    <div class="row">
      <div class="col-sm-12 col-md-6 text-center">
        <div class="card border-primary">
          <div class="card-body">
            <h5 class="card-title">Patreon</h5>
            <a href="https://www.patreon.com/bePatron?u=15819567" target="_top" class="patreon-button">
              <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" class="" />
            </a>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 text-center">
        <div class="card border-primary">
          <div class="card-body">
            <h5 class="card-title">PayPal</h5>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" class="paypal-form">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="L5JZS33ADMBQW" />
              <input type="image" src="https://www.paypalobjects.com/en_US/IT/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
              <img alt="" border="0" src="https://www.paypal.com/en_IT/i/scr/pixel.gif" width="1" height="1" />
            </form>
          </div>
        </div>
      </div>
    </div>
    ${donateParagraph}
  </div>
</div>
`;

var frameContent = /* html */ `
  <div class="container pt-1">
    <nav class="navbar navbar-dark bg-dark navbar-expand">
      <a class="navbar-brand" href onclick="return false;">Poe Trade Official Site Enhancer</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav nav" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" onclick="return false;">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="settings-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="settings" aria-selected="false" onclick="return false;">Settings</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="currency-tab" data-toggle="tab" href="#currency" role="tab" aria-controls="currency" aria-selected="false" onclick="return false;">Currencies</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="ghostscripter-tab" data-toggle="tab" href="#ghostscripter" role="tab" aria-controls="ghostscripter" aria-selected="false" onclick="return false;">GhostScripter</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div class="">
          <h2 class="">Poe Trade Official Site Enhancer <small class="text-secondary font-italic font-weight-light">v. 1.3.489</small></h2>
          ${shortDescriptionParagraph}
          <hr class="my-4">
          ${donateTemplate}
        </div>
        <hr class="my-4">
        <div class="">
          <h2 class="">Features</h2>
          <dl id="features-list">
          </dl>
        </div>
        <div class="">
        ${roadmapParagraph}
        </div>
        <div class="">
        ${issueTrackingParagraph}
        </div>
        <div class="">
        ${changeLogParagraph}
        </div>
        <div class="">
        ${repositoriesParagraph}
        </div>
        <div class="">
        ${licenseParagraph}
        </div>
    </div>
    <div class="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
      <div class="container" id="saved-alert" style="opacity: 0;">
        <div class="alert alert-light" role="alert">
          all changes saved
        </div>
      </div>
      <div class="container currencySettingsOnly">
        <div class="alert alert-warning" role="alert">
          Due to limitations on localstorage over different domains, currency and item search settings are completely separated
        </div>
      </div>
      <form id="settings-form">
      </form>
    </div>
    <div class="tab-pane fade" id="currency" role="tabpanel" aria-labelledby="currency-tab">
      <ul class="nav nav-tabs" id="myCurrTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link" id="preloaded-tab" data-toggle="tab" href="#preloaded-pane" role="tab" aria-controls="preloaded-pane" aria-selected="true">Preloaded</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" id="leagues-tab" data-toggle="tab" href="#leagues-pane" role="tab" aria-controls="leagues-pane" aria-selected="false">Leagues</a>
        </li>
      </ul>
      <p class="preloaded-info">Using preloaded values corresponding to Standard league values at the moment of the last major release. You can change these values manually or reset them. It is highly reccomended to enable currency load from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b> in settings tab or disable any currency reordering so that the original poe.trade order is untouched.</p>
      <p class="loaded-info d-none">Currency values loaded from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b>. You can change them manually but they will be overwritten again the next time they are refreshed.</p>
      <div class="tab-content" id="myCurrTabContent">
        <div class="tab-pane fade show active" id="preloaded-pane" role="tabpanel" aria-labelledby="preloaded-tab">
        </div>
        <div class="tab-pane fade" id="leagues-pane" role="tabpanel" aria-labelledby="leagues-tab"></div>
      </div>
    </div>
    <div class="tab-pane fade" id="ghostscripter" role="tabpanel" aria-labelledby="ghostscripter-tab">
      ${ghostscripterParagraph}
    </div>
  </div>
  <div class="modal fade" id="showcaseModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Features Showcase</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
</div>
`;


  var paragraphs = {
  parag1: {title: 'Item Search', featureTitle: 'Item Search enhancements', class: ''},
  parag2: {title: 'Currency Search', featureTitle: 'Currency Search enhancements', class: ''}
}

var settings = {
  loadImmediately: {
    type: 'Boolean', default: false, class: 'd-none',
    label:`Load immediately`, info:`If this is checked all resources will be loaded as soon as possible. This might make the page feel "slow", especially if the original site is already loading a lot of resources and scripts. If this is not checked resources will be loaded only when everything else is ready, one at a time and only if necessary. This way it will be few seconds more before you can interact with this userscript features, but the general startup of the application should feel smoother.`
  },
  useGSStyle: {
    type: 'Boolean', default: true,
    label:`Use GhostScripter style`, info:`If this is checked features added by this UserScript will standout so it's very clear what is added and what comes from the original site.`,
    nofeature:`Two styles available, one that blends as much as possible with the original site, the other which makes added feature stand out as much as possible.`
  },
  minimumRequestRate: {
    type: 'Number', min: 100, default: 500, paragraph: '',
    label:`Minimum time between any two requests to the server (milliseconds)`, info:`If you hit errors while sorting all results or running many multi live searches try to set this higher.`
  },
  blockUiWhileLoading: {
    type: 'Boolean', default: false, paragraph: '', class: '',
    label:`Block UI while sorting`, info:`If this is enabled a loading modal window will block the UI until all data have been loaded.`
  },
  enableChaosEquiv: {
    type: 'Boolean', default: true, paragraph: '', class: '',
    label:`Convert all prices to chaos equivalent`, info:`If you disable this all PTE conversion related features will be disabled.`,
    feature:`Sort item and currency searches on <b>pathofexile.com/trade</b> by current chaos equivalent using <b>poe.ninja</b> values.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/sort-real-curr-off.gif'
  },
  enableCurrencyLoad: {
    type: 'Boolean', default: true, paragraph: '', parent: 'enableChaosEquiv',
    label:`Load currency values from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b>`, info:`If you disable this PTE will use preloaded values corresponding to Standard league values at the moment of the last major release.`
  },
  currencyMaxAge: {
    type: 'Number', min: 0, max: 12, default: 6, parent: 'enableCurrencyLoad', paragraph: '', renderer: 'bar',
    label:`Max age for currency values: <b><span id="currencyMaxAge-val"></span> hr</b>`, info:`Maximum hours for which consider valide the currency values from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b>. After that time they will be loaded again at first load. If set to zero they will never be loaded again and must be refreshed manually from Currency tab.`
  },
  secondarySortByStockSize: {
    type: 'Boolean', default: true, paragraph: '', class: 'enableChaosEquiv',
    label:`Sort by stock size`, info:`Whenever sorting also sort by stock size, descending, so when buying in bulk, at same cost per unit the first results will be the ones with more stock available.`
  },
  autoSortByRealCurrency: {
    type: 'Boolean', default: false, paragraph: '', parent: 'enableCurrencyLoad',
    label:`Auto sort by real currency value`, info:`If you enable this both item and currency searches will be sorted automatically after load by real currency values, from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b> or manually modified.`
  },
  useSaveManager: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: '',
    label: `Enable save manager`, info:`Enabling this you'll be able to save and load searches.`,
    feature: `Adds a save manager to easily save and reload any item search.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/save-man-off.gif'
  },
  multiLiveSearch: {
    paragraph: 'parag1', class: '',
    feature: `Multi live-search. You can live-search any number of your saved searches in one page.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/multi-live-off.gif'
  },
  // enableCopyForPoB: {
  //   type: 'Boolean', default: true, paragraph: 'parag1', class: '',
  //   label: `Show copy for Path of Building button`, info:`Copies to clipboard a representation of the item ready to be imported in PoB.`,
  //   feature: `"Copy for Path of Building" button on every item result.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/copy-for-pob-off.gif'
  // },
  enableGroupedResults: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: '',
    label: `Enable grouping of results by same seller`, info:``,
    feature: `Result can be grouped by user selling`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/group-same-user-off.gif'
  },
  autoGroupSameUser: {
    type: 'Boolean', default: false, paragraph: 'parag1', parent: 'enableGroupedResults', class: '',
    label:`Auto group results from the same user`, info:`If you enable this item search results will automatically be grouped by user and also sorted by average real currency value (from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b>) and quantity of items beeing sold. Usefull for maps and other "consumables", not for equipment search (but you can always ungoup results when needed).`
  },
  showGroupButtonOnZeroMoreFromSameUser: {
    type: 'Boolean', default: false, paragraph: 'parag1', parent: 'enableGroupedResults', class: '',
    label:`Show group by user button on all items`, info:`If you enable this the button that let you group results from the same user will be visible even on items that have no other items to group.`
  },
  enableMaxNormCost: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: '',
    label: `Show max tier normalized cost`, info:`If you enable this it will be shown the cost of max tier item for items with clear vendor recipes (essences and sextant).`,
    feature: `For tiered items (essences, sextants...) show the cost of reaching max tier, also enabling sorting by this value.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/max-tier-off.gif'
  },
  enableMaxQtCost: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: '',
    label: `Show max quality normalized cost for gems`, info:`If you enable this for gems it will be shown the total cost to buy the gem and bring it to max quality using actual gemcutter's cost.`,
    feature: `For gems show the cost of reaching max quality by buying the gem and the necessary gemcutter's prisms, also enabling sorting by this value.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/max-qt-off.gif'
  },
  addWikiLinks: {
    paragraph: 'parag1', class: 'd-none',
    feature: `Wiki links for additional items and types.`
  },
  trackContactedOnCurrencySearches: {
    type: 'Boolean', default: true, paragraph: 'parag2', class: '',
    label:`Track "contacted" also in currency searches`, info:`Track already contacted seller like for item searches.`,
    feature:`Track "contacted" seller in currency searches like the app already does for item searches.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/contacted-off.gif'
  },
  customQuantitiesOnCurrencySearches: {
    type: 'Boolean', default: true, paragraph: 'parag2', class: 'd-none',
    label:`Change quantities freely`, info:`Enabling this you'll be able to manually change quantities as you wish. Just click on the quantity you want to change (buying/selling) and the other will be recalculated using the same ratio.`,
    feature:`Change quantities in currency searches freely.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/change-qt-off.gif'
  }
};

  try {
  if (SAFE) {
    GM_addStyle(`
      img {
        opacity: 0 !important;
        visibility: hidden;
      }
      :not(.copy):not(.searchBy) {
        background-image: none !important;
      }
    `);
  }
} catch(e) {}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
var debug = function(){}, info = function(){}, warn = function(){}, log = function(){};
var setupDebugger = function(level) {
  if (level) {
    var lc = _.lowerCase(level)
    if (level === true || lc == "debug") debug = console.debug.bind(window.console)
    else debug = function(){};
    if (level === true || lc == "debug" || lc == "info") info = console.info.bind(window.console)
    else info = function(){};
    if (level === true || lc == "debug" || lc == "info" || lc == "log") log = console.log.bind(window.console)
    else log = function(){};
    if (level === true || lc == "debug" || lc == "info" || lc == "log" || lc == "warn") warn = console.warn.bind(window.console)
    else warn = function(){};
  } else {
    debug = function(){}, info = function(){}, log = function(){}, warn = function(){};
  }
};
setupDebugger(DEBUG);

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.style.opacity = "0";
  textArea.style.height = "0px";
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    debug('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

var addResources = function(urlsToLoad, element, options, callback) {
  if (!callback) {
    callback = options;
    options = {};
  }
  if (urlsToLoad.length > 0) {
    var resource = urlsToLoad.splice(0, 1)[0];
    debug(resource);
    if (resource.is("script")) {
      $.getScript(resource.attr("src"), function() {
        if (!options.loadImmediately) addResources(urlsToLoad, element, options, callback);
      });
      if (options.loadImmediately) addResources(urlsToLoad, element, options, callback);
    } else {
      resource.on("load", function() {
        if (!options.loadImmediately) addResources(urlsToLoad, element, options, callback);
      });
      element.append(resource);
      if (options.loadImmediately) addResources(urlsToLoad, element, options, callback);
    }
  } else {
    callback();
  }
};

var frameBuilders = {};

var openFrame = function(id) {
  if ($(`#${id}`).length == 0 && frameBuilders[id]) {
    buildIframe(frameBuilders[id], function() {
      jQuery.event.trigger(`${id}-frame-open`, []);
      $(`#${id},.${id}-backdrop`).removeClass("hide");
    });
  } else {
    jQuery.event.trigger(`${id}-frame-open`, []);
    $(`#${id},.${id}-backdrop`).removeClass("hide");
  }
};

var closeFrame = function(id) {
  jQuery.event.trigger(`${id}-frame-close`, []);
  $(`#${id},.${id}-backdrop`).addClass("hide");
};

var buildIframe = function(options, callback) {
  debug("buildFrame");
  setTimeout(function(){
    debug("buildFrame: ", options);
    var iframe = $(`<iframe id="${options.id}" name="${options.id}" class="gs-frame hide"></iframe>`);
    var backdrop = $(`<div class="${options.id}-backdrop gs-backdrop hide"></div>`);
    backdrop.on('click', function() {
      closeFrame(options.id);
    });
    if (options.src) {
      iframe.attr('src', options.src);
    }

    iframe.one('load',function(){
      debug('init iframe content');
      if (options.frameTemplate) {
        iframe.contents().find('head')
        .append(options.frameTemplate);
      }
      if (options.contents) {
        iframe.contents().find('body')
        .addClass('frame-'+options.id)
        .append(options.contents);
      }
      var cb = function() {
        jQuery.event.trigger(`${options.id}-frame-created`, [iframe]);
        if (callback) callback();
      };
      debug("buildFrame: ", options);
      if (options.builder) {
        options.builder(iframe, cb);
      } else {
        cb();
      }
    });
    $('body').prepend(backdrop).prepend(iframe);

    if (options.onOpen) {
      $(document).on(`${options.id}-frame-open`, options.onOpen);
    }
    if (options.onClose) {
      $(document).on(`${options.id}-frame-close`, options.onClose);
    }

  }, 100);
};

var addIframe = function(options, callback) {
  debug($(options.trigger), "iframe trigger");
  $(options.trigger).on( "click", function() {
    debug(`opening frame ${options.id}`);
    openFrame(options.id);
  });
  if (getSetting("loadImmediately")) {
    buildIframe(options, callback);
  } else {
    frameBuilders[options.id] = options;
    if (callback) callback();
  }
};

var insertOnParagraph = function(iframe, element, paragraph, prefix, elType, parent) {
  var before = null;
  if (paragraph) {
    before = iframe.contents().find(prefix+paragraph+' ~ '+elType+':first');
  } else {
    before = iframe.contents().find(prefix+'ungrouped ~ '+elType+':first');
  }
  if (before && before.length) {
    before.before(element);
  } else {
    iframe.contents().find(parent).append(element);
  }
  return element;
};

var getFormGroup = function(key, set) {
  var renderer = set.renderer ? set.renderer : set.type;
  var element;
  switch (renderer) {
    case "Boolean":
      element = /* html */`
      <div class="form-group ${set.class}">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="${key}" aria-describedby="${key}HelpBlock">
          <label class="form-check-label" for="${key}">
            ${set.label}
          </label>
          <small id="${key}HelpBlock" class="form-text text-muted">
            ${set.info}
          </small>
        </div>
      </div>
      `;
      break;
    case "bar":
      element = /* html */`
      <div class="form-group ${set.class}">
        <label for="${key}">${set.label}</label>
        <input type="range" class="custom-range" min="${set.min}" max="${set.max}" id="${key}">
        <small id="${key}HelpBlock" class="form-text text-muted">
          ${set.info}
        </small>
      </div>
      `;
      break;
    case "Number":
      element = /* html */`
      <div class="form-group ${set.class}">
        <label for="${key}">${set.label}</label>
        <input type="number" class="ml-2" min="${set.min}" max="${set.max}" id="${key}">
        <small id="${key}HelpBlock" class="form-text text-muted">
          ${set.info}
        </small>
      </div>
      `;
      break;
    default:
        element = /* html */`
        <p class="lead text-danger ${set.class}">
          <strong>Renderer ${renderer} unimplemented yet.</strong>
        </p>
        `;
        break;
  }
  return element;
};

function evalInContext(js, context) {
    return function() { return eval(js); }.call(context);
}

var waitFor = function() {
  var globs, options = {tick: 100, max: -1}, callback, stop = false, error = false;
  debug(`waitFor arguments:`, arguments);
  if (arguments.length >= 2) {
    globs = arguments[0];
    callback = arguments[1];
    if (arguments.length == 3) {
      callback = arguments[2];
      options = $.extend({}, options, arguments[1]);
    }
    debug(`waitFor options:`, options);
    try {
      if (!options.started) {
        options.started = moment().valueOf();
      } else if (options.max > 0 && moment.duration(moment().diff(options.started)).asMilliseconds() >= options.max) {
        stop = true;
        error = new Error("waitFor timeout reached");
      }
    } catch(ex) {
      debug(`waitFor maxAge check exception: ${ex}`);
    }
    try {
      _.each(_.flatten([globs]), function(g) {
        debug(`eval => ${g}`);
        if (_.isFunction(g)) {
          g();
        } else if (options.context) {
          evalInContext(g, context);
        } else {
          eval(g);
        }
      });
      stop = true;
    } catch(ex) {
      debug(`waitFor eval exception: ${ex}`);
    }
    if (stop) {
      if (error && options.onFailure) {
        options.onFailure(error);
      } else {
        callback();
      }
    } else {
      setTimeout(function(){ waitFor(globs, options, callback); }, options.tick);
    }
  }
};

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    // document.body.removeChild(script); // clean up
}

function execText(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = fn;
    document.body.appendChild(script); // run the script
    // document.body.removeChild(script); // clean up
}

(function(window,undefined){
  var $ = window.jQuery || window.Cowboy || ( window.Cowboy = {} ),
    jq_throttle;
    $.throttle = jq_throttle = function( delay, no_trailing, callback, debounce_mode ) {
      var timeout_id, last_exec = 0;
      if ( typeof no_trailing !== 'boolean' ) {
        debounce_mode = callback;
        callback = no_trailing;
        no_trailing = undefined;
      }

      function wrapper() {
        var that = this, elapsed = +new Date() - last_exec, args = arguments;

        function exec() {
          last_exec = +new Date();
          callback.apply( that, args );
        };

        function clear() {
          timeout_id = undefined;
        };

        if ( debounce_mode && !timeout_id ) {
          exec();
        }

        timeout_id && clearTimeout( timeout_id );

        if ( debounce_mode === undefined && elapsed > delay ) {
          exec();
        } else if ( no_trailing !== true ) {
          timeout_id = setTimeout( debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay );
        }
      };

      if ( $.guid ) {
        wrapper.guid = callback.guid = callback.guid || $.guid++;
      }

      return wrapper;
  };

  $.debounce = function( delay, at_begin, callback ) {
    return callback === undefined
      ? jq_throttle( delay, at_begin, false )
      : jq_throttle( delay, callback, at_begin !== false );
  };

})(window);

var randomize = function(n, perc) {
  if (perc === undefined || perc === null) perc = 0.1;
  if (perc <= 1) {
  } else if (perc <= 100) {
    perc = perc / 100;
  } else {
    perc = 0.1;
  }
  var min = n * (1 - perc), max = n * (1 + perc);
  return ((Math.random() * (max - min)) + min);
}

function ModalLoading(title, total, options) {
  if (!options) options = {};
  var _this = this;
  _this.title = title;
  _this.total = total;
  _this.done = options.initialDone || 0;
  _this.addDone = function() {
    _this.done++;
    _this.write();
  };
  _this.write = function() {
    $('#gs-modal-loading-title').text(_this.title || "");
    $('#gs-modal-loading-counter').text(_this.total ? (`${_this.done} of ${_this.total}`) : "");
    if (!_this.total || _this.done / _this.total >= 0.75) {
      $('#gs-modal-loading-spinner').addClass("gs-loaded-three-quarters");
      $('#gs-modal-loading-spinner').removeClass("gs-loaded-half gs-loaded-full");
    } else if (_this.done / _this.total >= 0.5) {
      $('#gs-modal-loading-spinner').addClass("gs-loaded-half");
      $('#gs-modal-loading-spinner').removeClass("gs-loaded-three-quarters gs-loaded-full");
    } else {
      $('#gs-modal-loading-spinner').removeClass("gs-loaded-three-quarters gs-loaded-full gs-loaded-half");
    }
  };
  _this.start = function() {
    var overlay = $('#gs-modal-loading-backdrop');
    if (overlay.length === 0) {
      overlay = $('<div id="gs-modal-loading-backdrop" class="gs-backdrop hide"><div id="gs-modal-loading" class="gs-style gs-loading"><div id="gs-modal-loading-title" class="gs-loading-title"></div><div id="gs-modal-loading-spinner" class="gs-loading-spinner"></div><div id="gs-modal-loading-counter" class="gs-loading-counter"></div></div></div>');
      overlay.on('click',_this.stop);
      $('body').append(overlay);
    }
    _this.write();
    overlay.removeClass("hide");
  }
  _this.stop = function() {
    $('#gs-modal-loading-backdrop').addClass("hide");
  }
  if (!options.doNotSort) {
    _this.start();
  }
}

// fields must be an array of object with properties field and direction (asc/desc)
var comparator = function(x, y, fields, nullsNotTrailing) {
  var compare = function (a, b, f) {
    var aa = _.get(a, f.field, null), bb = _.get(b, f.field, null);
    if (_.isNil(aa)) {
      return ((_.isNil(bb)) ? 0 : ((nullsNotTrailing) ? -1 : 1));
    } else if (_.isNil(bb)) {
      return ((nullsNotTrailing) ? 1 : -1);
    } else {
      return ((f.comparator) ? f.comparator(aa, bb) : ((f.direction == "asc") ? (aa - bb) : (bb - aa)));
    }
  };

  var fIndex = 0, diff = 0;
  while (diff === 0 && fIndex < fields.length) {
    diff = compare(x, y, fields[fIndex]);
    fIndex++;
  }
  return diff;
}


var pacedWhen = function(deferredList, params) {
  var options = {tick: 100, max: 2, failureThreshold: 0}, failed = 0, count = deferredList.length, deferred = $.Deferred(), results = [], gsModalLoading;
  if (params) options = $.extend({}, options, params);

  if (options.modalTitle) {
    gsModalLoading = new ModalLoading(options.modalTitle, deferredList.length);
  }

  async.mapLimit(deferredList, options.max, function(q, mcb) {
    setTimeout(function(){
      debug("pacedWhen next element", q);
      q().done(function(dt) {
        debug("pacedWhen element done", q, dt);
        if (gsModalLoading) gsModalLoading.addDone();
        mcb(null, dt);
      }).fail(function(err) {
        failed++;
        if (failed/count <= options.failureThreshold) {
          debug("pacedWhen element failed, but still under failure threshold", q, err);
          mcb(null, null);
        } else {
          debug("pacedWhen element failed", q, err);
          mcb(err, null);
        }
      });
    }, options.tick);
  }, function(merr, mresults) {
    if (gsModalLoading) gsModalLoading.stop();
    if (merr) {
      deferred.reject(merr);
    } else {
      deferred.resolve(mresults);
    }
  });

  return deferred;
};


var isSettingDisabled = function(key) {
  if (settings[key].parent) {
    if (!getSetting(settings[key].parent)) {
      return true;
    } else {
      return isSettingDisabled(settings[key].parent);
    }
  } else {
    return false;
  }
};

function getSetting(key) {
  // TODO: ensure type, min and max
  if (settings[key] && settings[key].value) {
    debug(key+" already loaded with value: "+settings[key].value);
    return settings[key].value;
  } else {
    debug(`about tp get ${namespace+"."+key} from localStorage`);
    var val = localStorage.getItem(namespace+"."+key);
    debug(`got ${namespace+"."+key} from localStorage: ${val}`);
    if ((val === undefined || val === null) && settings[key] && settings[key].default) {
      val = settings[key].default;
    }
    if (settings[key] && settings[key].type) {
      switch (settings[key].type) {
        case "Number":
          val = val ? Number(val) : null;
        break;
        case "Boolean":
          val = (val && (""+val).toLowerCase() === "true" && !isSettingDisabled(key));
        break;
        default:
        break;
      }
    } else {
      settings[key] = {};
    }
    settings[key].value = val;
    debug(key+" loaded from localStorage: "+settings[key].value);
    return val;
  }
};

function setSetting(key, val) {
  settings[key]['value'] = val;
  localStorage.setItem(namespace+"."+key, val);
  jQuery.event.trigger('gs-settings', [key, val]);
  jQuery.event.trigger('gs-settings-'+key, [val]);
  debug(key+" set to: "+val);
};

if (getSetting("DEBUG") !== null && getSetting("DEBUG") !== undefined) {
  setupDebugger(getSetting("DEBUG"));
}
$(document).bind('gs-settings-DEBUG', function(e, val) {
  setupDebugger(val);
});


var initPage = function(loc, callback) {
  debug("initPage for "+loc);

  $.each(cssUrls, function( i, url ) {
    resources.push($("<link/>", {
      rel: "stylesheet",
      type: "text/css",
      crossorigin: "anonymous",
      href: url
    }));
  });

  $.each(jsUrls, function( i, url ) {
    resources.push($("<script/>", {
      type: "text/javascript",
      src: url
    }));
  });

  addResources(resources, $("head"), {loadImmediately: getSetting('loadImmediately')}, function() {
    addSettingsIconAndCommonInit(loc);
    addIframe({id:"setting-frame", frameTemplate: frameTemplate, contents: frameContent, trigger: "a.gs-settings", builder: createSettingsFrame}, function() {
      if (callback) callback();
      endInit();
    });
    var setStyleEnabler = function(e, val) {
      if (val === undefined || val === null) {
        val = getSetting('useGSStyle');
      }
      $('body').toggleClass("gs-style-enabler", val);
    };
    $(document).bind('gs-settings-useGSStyle', setStyleEnabler);
    setStyleEnabler();
  });

}

var createSettingsFrame = function(iframe, callback) {
  debug("createSettingsFrame: "+iframe);
  // iframe.on('load',function(){
    debug("createSettingsFrame: loaded");
    var saved = function() {
      iframe.contents().find('#saved-alert').stop().css({'opacity':1, 'z-index': 1000}).animate({'opacity': 0, 'z-index': 0}, 3000);
    };

    var setDisabler = function() {
      $.each( settings, function( key, set ) {
        var setter = iframe.contents().find('#'+key);
        setter.prop('disabled', isSettingDisabled(key));
        if (setter.attr('type') == "range") {
          if (isSettingDisabled(key)) {
            setter.parent().addClass("disabled");
          } else {
            setter.parent().removeClass("disabled");
          }
        }
      });
    };

    $.each( paragraphs, function( key, par ) {
      if (par.title) {
        iframe.contents().find('#settings-form').append(`<hr class="${par.class}">`).append(`<h4 id="sett-${key}" class="${par.class}">${par.title}</h4>`);
      }
      if (par.featureTitle) {
        iframe.contents().find('#features-list').append(`<dt id="feature-${key}" class="${par.class}">${par.featureTitle}</dt>`);
      }
    });
    iframe.contents().find('#features-list').prepend(`<dt id="feature-ungrouped" class="mt-3 mb-2 border-top border-secondary d-none"></dt>`);
    iframe.contents().find('#settings-form').prepend(`<h4 id="sett-ungrouped" class=""></h4>`);

    $.each( settings, function( key, set ) {
      debug( key + ": " + set );
      if (set.feature) {
        var dd = $(`<dd class="${set.class}">${set.feature}</dd>`);
        if (set.showcase) {
          var scIcon = $(`<a class="ml-2" title="Showcase this feature"><i class="fas fa-film"></i></a>`);
          dd.append(scIcon);
          scIcon.on( "click", function(e) {
            iframe.contents().find('#showcaseModal .modal-body').empty().append(`<img class="img-fluid" alt="${set.feature} Showcase" src="${set.showcase}" />`);
            iframe.contents().find('#showcaseModal').modal('show');
          });
        }
        insertOnParagraph(iframe, dd, set.paragraph, '#feature-', 'dt', '#features-list');
      }
      if (set.type) {
        var block = getFormGroup(key, set);
        insertOnParagraph(iframe, block, set.paragraph, '#sett-', 'h4', '#settings-form');
      }
    });

    $.each( settings, function( key, set ) {
      var setter = iframe.contents().find('#'+key);
      var valuer = iframe.contents().find('#'+key+"-val");
      if (setter.length > 0) {
        var val = getSetting(key);
        if (valuer.length) {
          valuer.text(val);
        }
        if (set.type == "Boolean") {
          setter.prop('checked', val);
          setter.change(function() {
            setSetting(key, $(this).is(':checked'));
            if (valuer.length) {
              valuer.text(getSetting(key));
            }
            setDisabler();
            saved();
          });
        } else {
          setter.val(val);
          setter.change(function() {
            setSetting(key, $(this).val());
            if (valuer.length) {
              valuer.text(getSetting(key));
            }
            setDisabler();
            saved();
          });
        }
        setDisabler();
      }
    });

    if (callback) callback();
  // });
};

var endInit = function() {
  $(".fas.fa-cog.fa-spin").removeClass("fa-spin");
  
};


info("version: 1.3.489");

  ;(function(factory) {
    if(typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
    else if(typeof exports === 'object') {
        module.exports = factory(require("jquery"));
    }
    else {
        factory(jQuery);
    }
}
(function($) {
    var pluginName = "tinycolorpicker"
    ,   defaults   = {
            colors : ["#ffffff", "#A7194B","#FE2712","#FB9902","#FABC02","#FEFE33","#D0EA2B","#66B032","#0391CE","#0247FE","#3D01A5","#8601AF"]
        ,   backgroundUrl : null
        }
    ;

    function Plugin($container, options) {
        /**
         * The options of the colorpicker extended with the defaults.
         *
         * @property options
         * @type Object
         */
        this.options = $.extend({}, defaults, options);

        /**
         * @property _defaults
         * @type Object
         * @private
         * @default defaults
         */
        this._defaults = defaults;

        /**
         * @property _name
         * @type String
         * @private
         * @final
         * @default 'tinycolorpicker'
         */
        this._name = pluginName;

        var self = this
        ,   $track = $container.find(".track")
        ,   $color = $container.find(".color")
        ,   $colorInner = $container.find(".color .colorInner")
        ,   $canvas = null
        ,   $colorInput = $container.find(".colorInput")
        ,   $dropdown = $container.find(".dropdown")
        ,   $dropdownItem = $dropdown.find("li").remove()

        ,   context = null
        ,   mouseIsDown = false
        ,   hasCanvas = !!document.createElement("canvas").getContext
        ,   touchEvents = "ontouchstart" in document.documentElement
        ;

        /**
         * The current active color in hex.
         *
         * @property colorHex
         * @type String
         * @default ""
         */
        this.colorHex = "";

        /**
         * The current active color in rgb.
         *
         * @property colorRGB
         * @type String
         * @default ""
         */
        this.colorRGB = "";

        /**
         * @method _initialize
         * @private
         */
        function _initialize() {
            if(hasCanvas) {
                $canvas = $("<canvas></canvas>");
                $track.append($canvas);

                context = $canvas[0].getContext( "2d" );

                _setImage();
            }
            else {
                $.each(self.options.colors, function(index, color) {
                    var $clone = $dropdownItem.clone();

                    $clone.css("backgroundColor", color);
                    $clone.attr("data-color", color);

                    $dropdown.append($clone);
                });
            }

            _setEvents();
            if (self.options.color) {
              self.originalColor = self.options.color;
              self.setColor(self.options.color);
            }

            return self;
        }

        /**
         * @method _setImage
         * @private
         */
        function _setImage() {
            var colorPicker = new Image(), backgroundUrl = $track.css("background-image");
            debug("colorPicker backgroundUrl", backgroundUrl);
            if (backgroundUrl) {
              backgroundUrl = backgroundUrl.replace(/"/g, "").replace(/url\(|\)$/ig, "");
            }
            if (self.options.image) {
              colorPicker = self.options.image;
            }
            $track.css("background-image", "none");

            $(colorPicker).load(function() {
                $canvas.attr("width", this.width);
                $canvas.attr("height", this.height);

                context.drawImage(colorPicker, 0, 0, this.width, this.height);
            });

            if (!self.options.image) {
              colorPicker.crossOrigin = "Anonymous";
              colorPicker.src = self.options.backgroundUrl || backgroundUrl;
              debug(self.options.backgroundUrl || backgroundUrl);
            }
        }

        /**
         * @method _setEvents
         * @private
         */
        function _setEvents() {
            var eventType = touchEvents ? "touchstart" : "mousedown";

            if(hasCanvas) {
                $color.on(eventType, function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    $track.toggle();
                    debug($track.is(":visible"));
                    if ($track.is(":visible")) {
                      $color.parents('body').on("mousedown.colorpicker", function(event) {
                        $color.parents('body').off(".colorpicker");
                        self._resetColor();
                        self.close();
                      });
                    } else {
                      _selectColor();

                      $color.parents('body').off(".colorpicker");
                      self.close();
                    }
                });

                if(!touchEvents) {
                    $canvas.mousedown(function(event) {
                        mouseIsDown = true;

                        _getColorCanvas(event);
                        _selectColor();

                        $color.parents('body').off(".colorpicker");
                        self.close();

                        return false;
                    });

                    $canvas.mousemove(_getColorCanvas);
                }
                else {
                    $canvas.on("touchstart", function(event) {
                        mouseIsDown = true;

                        _getColorCanvas(event.originalEvent.touches[0]);

                        return false;
                    });

                    $canvas.on("touchmove", function(event) {
                        _getColorCanvas(event.originalEvent.touches[0]);

                        return false;
                    });

                    $canvas.on("touchend", function(event) {
                        self.close();

                        return false;
                    });
                }
            }
            else {
                $color.on("mousedown", function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    $dropdown.toggle();
                });

                $dropdown.delegate("li", "mousedown", function(event) {
                    event.preventDefault();
                    event.stopImmediatePropagation();

                    var color = $(this).attr("data-color");

                    self.setColor(color);

                    $dropdown.hide();
                });
            }
        }

        /**
         * @method _getColorCanvas
         * @private
         */
         function _getColorCanvas(event) {
           var $target = $(event.target)
           ,   offset = $target.offset()
           ,   colorData = context.getImageData(event.pageX - offset.left, event.pageY - offset.top, 1, 1).data
           ;
           if (colorData[3] == 0) {
             self.setColor("");
           } else {
             self.setColor("rgb(" + colorData[0] + "," + colorData[1] + "," + colorData[2] + ")");
           }

         }

        /**
         * @method _selectColor
         * @private
         */
         function _selectColor() {

           self.originalColor = self.colorHex;

           $container.trigger("change", [self.colorHex, self.colorRGB]);
         }

        /**
         * Set the color to a given hex or rgb color.
         *
         * @method setColor
         * @chainable
         */
         this.setColor = function(color) {
           if (color == "") {
             self.colorHex = "";
             self.colorRGB = "";
           } else if(color.indexOf("#") >= 0) {
             self.colorHex = color;
             self.colorRGB = self.hexToRgb(self.colorHex);
           } else {
             self.colorRGB = color;
             self.colorHex = self.rgbToHex(self.colorRGB);
           }
           $colorInner.css("backgroundColor", self.colorHex);
           $colorInput.val(self.colorHex);
         };

        /**
         * Set the color to the initial value.
         *
         * @method _resetColor
         * @chainable
         */
        this._resetColor = function() {
          if (self.originalColor) {
            self.setColor(self.originalColor);
          } else {
            $color.find(".colorInner").css("backgroundColor", "");
          }
        };

        /**
         * Close the picker
         *
         * @method close
         * @chainable
         */
        this.close = function() {
            mouseIsDown = false;

            $track.hide();
        };

        /**
         * Convert hex to rgb
         *
         * @method hexToRgb
         * @chainable
         */
        this.hexToRgb = function(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

            return "rgb(" + parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16) + ")";
        };

        /**
         * Convert rgb to hex
         *
         * @method rgbToHex
         * @chainable
         */
        this.rgbToHex = function(rgb) {
            var result = rgb.match(/\d+/g);

            function hex(x) {
                var digits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
                return isNaN(x) ? "00" : digits[(x - x % 16 ) / 16] + digits[x % 16];
            }

            return "#" + hex(result[0]) + hex(result[1]) + hex(result[2]);
        };

       return _initialize();
    }

    /**
     * @class tinycolorpicker
     * @constructor
     * @param {Object} options
        @param {Array} [options.colors=[]] fallback colors for old browsers (ie8-).
        @param {String} [options.backgroundUrl=''] It will look for a css image on the track div. If not found it will look if there's a url in this property.
     */
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if(!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin($(this), options));
            }
        });
    };
}));

var getColorPickerTemplate = function (id) {
  return /* html */ `
  <div id="${id ? id : ''}" class="colorPicker">
    <a class="color"><div class="colorInner"></div></a>
    <div class="track"></div>
    <ul class="dropdown"></ul>
    <input type="hidden" class="colorInput" value="#FFFFFF">
  </div>
  `
};



  var doOverrides = function() {
  //fix old jQuery
  $(document).on(`setting-frame-frame-created`, function(e, iframe) {
    fixTabs(iframe, "#myTab", "#myTabContent");

    iframe.contents().find('#currency-tab').on('click', function (e) {
      initCurrencyTables(iframe);
      fixTabs(iframe, "#myCurrTab", "#myCurrTabContent");
    });

  });

  $(document).on(`setting-frame-frame-created`, function(e, iframe) {
    debug(arguments, "setting-frame-frame-created");
    // $.fn.modal = function() {
    //   debug(arguments, "MODAL");
    //   if (arguments.length && arguments[0] == "show") {
    //     $(this).removeClass("hide");
    //   }
    // };
  });

  eval(GM_getResourceText("editableJs"));

  //function override
  $.each = function( obj, callback ) {
    var length, i = 0;
    if ( _.isArrayLike( obj ) ) {
      length = obj.length;
      for ( ; i < length; i++ ) {
        if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
          break;
        }
      }
    } else {
      for ( i in obj ) {
        if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
          break;
        }
      }
    }

    return obj;
  };

  app.$store.subscribe(function(mutation, state){
    switch (mutation.type) {
    case "setItemForSearchResult":
      info("STATE CHANGE: " + mutation.type, mutation.payload);
      itemsLoading[mutation.payload.localId+'-'+mutation.payload.id] = true;
      itemsLoaded(mutation);
      break;
    case "addSearchResult":
      info("STATE CHANGE: " + mutation.type, mutation.payload);
      searchLoading[mutation.payload.localId+'-'+mutation.payload.resultId] = true;
      searchLoaded(mutation);
      break;
    case "setTab":
      info("STATE CHANGE: " + mutation.type, mutation.payload);
      tabSelected(mutation.payload);
      break;
    case "removeCurrentSearch":
    case "setSearchDirty":
    case "clearSearchResults":
      info("STATE CHANGE: " + mutation.type, mutation.payload);
      searchChanged(mutation);
      break;
    case "clearSearchForm":
      info("STATE CHANGE: " + mutation.type, mutation.payload);
      clearSearchForm(mutation);
      break;
    case "updateBlurred":
    case "resetActiveUnreadHits":
      info("STATE CHANGE: " + mutation.type, mutation.payload);
      break;
    default:
      info("STATE CHANGE: " + mutation.type, mutation.payload);
      break;
    }
  });
};

function copyToClipboard(text) {
  fallbackCopyTextToClipboard(text);
  app.$root.$refs.toastr.Add({
      msg: app.translate("Whisper message copied."),
      progressbar: !1,
      timeout: 2e3
  });
}

function getPriceSpan(buyout, text) {
  return $(`<span class="">${text ? text : ''}<span class="currency currency-chaos">${buyout}×</span><span class="currency-text currency-image"><img src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?v=c60aa876dd6bab31174df91b1da1b4f9" alt="chaos" title="chaos"></span></span>`);
}

function getShortText(item) {
  // name rarity ilvl Crafted Corrupted Mirrored
  var rarity, name, ilvl, text = item.item.typeLine;
  switch (item.item.frameType) {
    case 0:
      rarity = "Normal";
      break;
    case 1:
      rarity = "Magic";
      break;
    case 2:
      rarity = "Rare";
      break;
    case 3:
      rarity = "Unique";
      break;
    case 6: //card
      break;
    default:
      rarity = "Undefined";
      warn(`Unrecognized frameType [${item.item.frameType}] for item`, item);
      break;
  }
  text += " - " + rarity;
  if (item.item.ilvl) {
    text += " - ilvl: " + item.item.ilvl;
  }
  if (item.item.corrupted) {
    text += " - Corrupted";
  }
  if (item.item.duplicated) {
    text += " - Mirrored";
  }
  if (item.item.identified === false) {
    text += " - Unidentified";
  }
  return text;
}

var addResultMessage = function(messageElement, msgClass, builder) {
  if (messageElement && $('.results .'+msgClass).length === 0) {
    var div = $(`<div class="gs-style gs-style-light gs-result-message marg-b-5 marg-lr-8 ${msgClass}"></div>`);
    $('.results').prepend(div);
    div.append(messageElement);
    if (builder) {
      builder(div);
    }
  }
}

var fixTabs = function(iframe, nav, container) {
  debug(iframe.contents().find(nav + ' a.nav-link'));
  iframe.contents().find(nav + ' a.nav-link').on('click', function(e) {
    var id = $(this).attr('id');
    var panel = $(this).attr('href');
    iframe.contents().find('#'+id).tab("show");
    iframe.contents().find(container + ' .tab-pane.show').removeClass("show active");
    iframe.contents().find(panel).addClass("show active");
  });
};

var fixTips = function() {
  $(".gs-fixTips[data-tippy]").each(function( index ) {
    var el = $( this );
    tippy(el[0], {content: el.attr("data-tippy")});
  });
};

var fullyLoaded = {}, itemsLoading = {}, searchLoading = {};
//localId: "search_1"
var isFullyLoaded = function(localId) {
  return fullyLoaded[localId] && fullyLoaded[localId].loaded;
};

//localId: "search_1"
var getSearch = function(localId) {
  if (_.isString(localId)) {
    var search = _.find(app.$store.state.transient.searches, function(x) { return (x.localId == localId); });
    debug("getSearch.search: ", search);
    return search;
  } else {
    return localId;
  }
};

//localId: "search_1" || {}, resultId: "result_2"
var getResults = function(localId, resultId) {
  var results = _.find(getSearch(localId).results, function(x) { return (x.id == resultId); });
  debug("getResults.results: ", results);
  return results;
};

var tabSelected = function (tab) {
  log(tab);
  $('body').toggleClass('gs-search-tab', tab == "search");
  $('body').toggleClass('gs-exchange-tab', tab == "exchange");
};

var itemsLoaded = $.debounce( 250, function(mutation) {
  if (currencies && currencies.map) {
    debug("DEBOUNCED STATE CHANGE: " + mutation.type, mutation.payload);
    if (getSetting('autoSortByRealCurrency')  && !getSetting('autoGroupSameUser') && !fullyLoaded[mutation.payload.localId]) {
      sortFullPage("chaosEquivalent", mutation.payload.localId, mutation.payload.id, "Results have been automatically sorted by real currency values.");
    } else if (getSetting('autoGroupSameUser') && !fullyLoaded[mutation.payload.localId]) {
      groupSameUser(true, mutation.payload.localId, mutation.payload.id);
    } else {
      enhanceAllItems(mutation.payload.localId, mutation.payload.id);
    }
  } else {
    debug("DEBOUNCED STATE CHANGE NEED CURRENCIES: " + mutation.type, mutation.payload);
    getCurrencies(getCurrentLeague(), function(curr) {
      currencies = curr;
      itemsLoaded(mutation);
    });
  }
});

var searchLoaded = $.debounce( 250, function(mutation) {
  if (currencies && currencies.map) {
    debug("DEBOUNCED STATE CHANGE: " + mutation.type, mutation.payload);
    if (fullyLoaded[mutation.payload.localId] && fullyLoaded[mutation.payload.localId].needRender) {
      fullyLoaded[mutation.payload.localId].needRender = false;
      enhanceAllItems(mutation.payload.localId, mutation.payload.resultId);
    }
    if (getSetting('useSaveManager')) initSaveManager();
  } else {
    debug("DEBOUNCED STATE CHANGE NEED CURRENCIES: " + mutation.type, mutation.payload);
    getCurrencies(getCurrentLeague(), function(curr) {
      currencies = curr;
      searchLoaded(mutation);
    });
  }
});

var searchChanged = $.debounce( 250, function(mutation) {
  if (currencies && currencies.map) {
    debug("DEBOUNCED STATE CHANGE: " + mutation.type, mutation.payload);
    if (getSetting('useSaveManager')) initSaveManager();
    fixTips();
  } else {
    debug("DEBOUNCED STATE CHANGE NEED CURRENCIES: " + mutation.type, mutation.payload);
    getCurrencies(getCurrentLeague(), function(curr) {
      currencies = curr;
      searchLoaded(mutation);
    });
  }
});

var clearSearchForm = $.debounce( 250, function(mutation) {
  if ($('.results .gs-result-message').length > 0) {
    $('.results .gs-result-message').remove();
  }
});

function toggleGroup(localId, resultId) {
  if ($('body').hasClass("grouped")) {
    ungroupSameUser(false, localId, resultId);
  } else {
    groupSameUser(false, localId, resultId);
  }
}

function groupSameUser(showAutoSortMessage, localId, resultId) {
  $('body').addClass("grouped");
  sortFullPage("buyoutGrouped", localId, resultId, (showAutoSortMessage ? "Results have been automatically grouped by and sorted by real currency values." : null));
}

function ungroupSameUser(doNotSort, localId, resultId) {
  $('body').removeClass("grouped");
  if (!doNotSort) sortFullPage('chaosEquivalent', localId, resultId);
}

function addMoreFromSameUserToItem(data, allItems) {
  data.more = [], data.first = true;
  data.totalBuyout = 0;
  if (_.has(data, "listing.price.amount")) {
    data.totalBuyout += convertBuyout(data.listing.price.amount + " " + data.listing.price.currency);
  }
  var index = _.indexOf(Object.keys(allItems), data.id);
  $.each( Object.keys(allItems), function( i, id ) {
    var item = allItems[id];
    if (_.has(data, "listing.account.name") && _.has(item, "listing.account.name") && data.listing.account.name == item.listing.account.name && id != data.id && _.indexOf(data.more, id) < 0) {
      data.more.push(id);
      if (i < index) {
        data.first = false;
      }
      if (_.has(item, "listing.price.amount")) {
        data.totalBuyout += convertBuyout(item.listing.price.amount + " " + item.listing.price.currency);
      }
    }
  });
  if (_.has(data, "listing.account.name")) {
    debug("more from "+data.listing.account.name, "searched over "+Object.keys(allItems).length, data.more);
  }
  data.buyoutPerItem = data.totalBuyout / (data.more.length + 1);
  data.buyoutGrouped = ((data.totalBuyout > 0) ? (((data.totalBuyout / (data.more.length + 1)) * 10000) - data.more.length) : null);
}

var renderMoreFromSameUser = function(item, data, localId, resultId) {
  var more = $(`<span class="gs-style gs-more gs-item-handle">${data.more.length} more from same user</span>`);
  if (data.first || data.more.length === 0) {
    item.addClass("gs-group-head");
  } else {
    item.addClass("gs-group-member");
  }
  if (getSetting('showGroupButtonOnZeroMoreFromSameUser') || data.more.length > 0) {
    if (item.find('.gs-more').length > 0) {
      item.find('.gs-more').first().parent().empty().append(more);
    } else {
      item.find('div.price [data-field=price]').last().after(more);
      more.wrap(`<div class="gs-wrapper"></div>`);
    }
  }
  more.on('click', function() {
    toggleGroup(localId, resultId);
  });

  if (data.more.length > 0) {
    var otherResults = $(`<div id="otherResultsFor${data.id}">click on an item to copy the whisper text to clipboard<br /></div>`);
    var search = getSearch(localId);
    var results = getResults(search, resultId);

    $.each( data.more, function( index, id ) {
      var item = results.items[id];
      if (_.has(item, "listing.price.amount") && item.listing.price.amount) {
        var value = convertBuyout(item.listing.price.amount + " " + item.listing.price.currency);
        var shortText = getShortText(item);
        var spn = $('<a href="#" class="nowrap">' + getPriceSpan(value).html() + ' - ' + shortText + '</a>');
        otherResults.append(spn);
        otherResults.append('<br />');
        spn.on('click', function(e) {
          e.preventDefault();
          copyToClipboard(item.listing.whisper);
          $(`[data-id=${id}] .whisper-btn`).addClass("active").html(app.translate("Copied!"));
        });
      }
    });
    var avg = $(`<div>${getPriceSpan((Math.round(data.buyoutPerItem*100)/100), "<b>Average price: </b>").html()}<br />click to group/ungroup results by user</div>`);
    var tipb = tippy(more[0], {content: avg[0], placement: "bottom", multiple: true});
    var tip = tippy(more[0], {content: otherResults[0], interactive: true, placement: "top", multiple: true});
  } else {
    tippy(more[0], {content: "click to group/ungroup results by user", placement: "bottom", multiple: true});
  }
};

function addMaxNormalizedCostToItem(data) {
  if (data.item && data.item.typeLine && data.listing.price && data.listing.price.amount) {
    var tier, maxTier;
    [tier, maxTier] = getTier(data.item.typeLine);
    if (tier && maxTier) {
      var buyout = convertBuyout(data.listing.price.amount + " " + data.listing.price.currency);
      var maxTierMulti = Math.pow(3, (maxTier - tier));
      var maxTierBuyout = buyout * maxTierMulti;
    }
    data.maxTierMulti = (buyout ? maxTierMulti : null);
    data.maxTierBuyout = (buyout ? maxTierBuyout : null);
  }
}

var renderMaxNormalized = function(item, data, localId, resultId) {
  if (item.find('.gs-max-tier').length == 0 && data.maxTierBuyout && data.listing.price) {
    if (data.listing.price.amount) {
      var sortHandle, tip;
      sortHandle = getPriceSpan((Math.round(data.maxTierBuyout*100)/100), "<b>Max Tier: </b>").addClass("gs-style gs-max-tier gs-item-handle");
      tip = $(`<div><span>To get a max tier item you need to buy <b>${data.maxTierMulti}</b> of this for a total of ${getPriceSpan((Math.round(data.maxTierBuyout*100)/100)).html()} chaos</span><br /><span>Click to sort results for max tier cost.</span></div>`);
      item.find('div.price [data-field=price]').last().after(sortHandle);
      sortHandle.wrap(`<div class="gs-wrapper"></div>`);
      tippy(sortHandle[0], {content: tip[0]});
      sortHandle.on('click', function(e) {
        e.preventDefault();
        sortFullPage("maxTierBuyout", localId, resultId);
      });
    }
  }
};

function addMaxQtCostToItem(data) {
  if (data.listing && data.listing.price && data.listing.price.amount && !data.item.corrupted && !data.item.duplicated && ((data.item.category && data.item.category.gems) || _.has(data.item, "support"))) {
    var qt = data.item.properties.find(function(x) {return x.name == "Quality" && x.values && x.values[0];});
    if (qt) {
      var match = /^\+?([\d]+)%?$/.exec(qt.values[0][0]);
      if (match) {
        qt = Number(match[1]);
      } else {
        qt = 0;
      }
    } else {
      qt = 0;
    }
    debug(`addMaxQtCostToItem.quality found: ${qt}`, data.item.properties);
    var maxqtcost = Math.max(20 - qt, 0) * convertBuyout("1 gcp");
    var buyout = convertBuyout(data.listing.price.amount + " " + data.listing.price.currency);
    maxqtcost += buyout;
    data.maxqtcost = (buyout ? maxqtcost : null);
  }
}

var renderMaxQt = function(item, data, localId, resultId) {
  if (item.find('.gs-max-qt').length == 0 && data.maxqtcost && data.listing.price) {
    if (data.listing.price.amount) {
      var sortHandle, tip;
      sortHandle = getPriceSpan((Math.round(data.maxqtcost*100)/100), "<b>Max QT: </b>").addClass("gs-style gs-max-qt gs-item-handle");
      tip = $(`<div><span>total ${getPriceSpan((Math.round(data.maxqtcost*100)/100)).html()} chaos for buying the gem and gemcutters to bring it to max quality.</span><br /><span>Click to sort results for max quality cost.</span></div>`);
      item.find('div.price [data-field=price]').last().after(sortHandle);
      sortHandle.wrap(`<div class="gs-wrapper"></div>`);
      // if (data.listing.price.currency == "chaos") {
      //   item.find('.price-label ~ br').nextAll('span:not(.chaosEquiv)').hide();
      // }
      tippy(sortHandle[0], {content: tip[0]});
      sortHandle.on('click', function(e) {
        e.preventDefault();
        sortFullPage("maxqtcost", localId, resultId);
      });
    }
  }
};

function addChaosEquivToItem(data) {
  if (data.listing && data.listing.price) {
    if (data.listing.price.amount) {
      data.buyout = data.listing.price.amount + " " + data.listing.price.currency;
      data.chaosEquivalent = convertBuyout(data.buyout);
    } else if (data.listing.price.amount == null || data.listing.price.amount == undefined) {
      // TIP: data.listing.price.item => sellcurrency and sellvalue => what you pay
      // TIP: data.listing.price.exchange => buycurrency and buyvalue => what you get
      var buyout = convertBuyout(data.listing.price.exchange.amount + " " + data.listing.price.exchange.currency);
      var cada = buyout / Number(data.listing.price.item.amount);
      var tot = convertBuyout(data.listing.price.item.amount + " " + data.listing.price.item.currency) - buyout;
      var chaosEquivalent = tot;
      if (buyout !== 0) {
        data.chaosEquivalentTotal = chaosEquivalent;
        data.chaosEquivalent = cada;
      }
    }
  }
}

var renderChaosEquiv = function(item, data, localId, resultId) {
  if (item.find('.chaosEquiv').length == 0 && data.chaosEquivalent && data.listing.price) {
    var sortHandle, tip;
    if (data.listing.price.amount) {
      //TIP: SINGLE ITEM
      sortHandle = $(`<span class="chaosEquiv"><span class="currency currency-chaos"><b>Chaos Equiv: </b>${(Math.round(data.chaosEquivalent*100)/100)}×</span><span class="currency-text currency-image"><img src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?v=c60aa876dd6bab31174df91b1da1b4f9" alt="chaos" title="chaos"></span></span>`);
      tip = getChaosEquivTip(data.buyout, data.listing.price.currency, (_.has(data, "listing.account.lastCharacterName") ? data.listing.account.lastCharacterName : null));
      item.find('div.price [data-field=price]').last().after(sortHandle);
      sortHandle.wrap(`<div class="gs-wrapper"></div>`);
      // if (data.listing.price.currency == "chaos") {
      //   item.find('.price-label ~ br').nextAll('span:not(.chaosEquiv)').hide();
      // }
    } else {
      //TIP: BULK CURRENCY
      sortHandle = $(`<span class="chaosEquiv"><span>${(Math.round(data.chaosEquivalent*100)/100)}</span><span>&nbsp;×&nbsp;</span><img src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?v=c60aa876dd6bab31174df91b1da1b4f9" alt="chaos" title="chaos"></span>`);
      tip = getCurrencyChaosEquivTip(data.chaosEquivalentTotal, data.chaosEquivalent, data.listing.price.item.currency, data.listing.price.exchange.currency);
      item.find('div.price').first().append(sortHandle);
      sortHandle.wrap(`<div class="gs-wrapper"></div>`);
      if (_.has(data, "listing.price.item.amount") && _.has(data, "listing.price.exchange.amount") && _.has(data, "listing.price.item.currency") && _.has(data, "listing.whisper")) {
        var min = $('<span class="gs-style gs-button">min</span>');
        var max = $('<span class="gs-style gs-button">max</span>');
        tippy(min[0], {content: `Copy to clipboard whisper for ${data.listing.price.item.amount} ${translateCurrencySafe(data.listing.price.item.currency)}`});
        min.on('click', function(e) {
          e.preventDefault();
          copyToClipboard(data.listing.whisper.replace("{0}", data.listing.price.item.amount).replace("{1}", data.listing.price.exchange.amount));
          item.find("div.details .whisper-btn").prev().addClass("copied");
        });
        var maxN = Math.floor(data.listing.price.item.stock / data.listing.price.item.amount);
        if (maxN > 1) {
          tippy(max[0], {content: `Copy to clipboard whisper for ${data.listing.price.item.amount * maxN} ${translateCurrencySafe(data.listing.price.item.currency)}`});
          max.on('click', function(e) {
            e.preventDefault();
            copyToClipboard(data.listing.whisper.replace("{0}", data.listing.price.item.amount * maxN).replace("{1}", data.listing.price.exchange.amount * maxN));
            item.find("div.details .whisper-btn").prev().addClass("copied");
          });
        } else {
          max.addClass("hide");
        }
        item.find('div.details .whisper-btn').parent().append(min).append(max);
      }
    }
    tippy(sortHandle[0], {content: tip[0], interactive: true});
    sortHandle.on('click', function(e) {
      e.preventDefault();
      sortFullPage("chaosEquivalent", localId, resultId);
    });
  }
};

//localId: "search_1", resultId: "result_2"
var enhanceAllItems = function(localId, resultId) {
  var search = getSearch(localId);
  var results = getResults(search, resultId);
  debug("enhanceAllItems.results: ", results);
  $.each( results.items, function( id, item ) {
    if (item) {
      var clone = enhanceItem(item, _.indexOf(results.result, id), results.items);
      if (clone) {
        app.$store.commit("setItemForSearchResult", {
          localId: localId,
          id: resultId,
          itemId: clone.id,
          itemData: clone
        });
      } else {
        waitFor([`$("[data-id=${id}]")[0].id`], function() {
          renderEnhancedItem($(`[data-id=${id}]`), item, localId, resultId);
        });
      }
    }
  });
};

var enhanceItem = function(item, index, allItems) {
  var clone = null;
  if (!(item.origIndex >= 0)) {
    debug("enhanceAllItems.item to enhance: ", item);
    if (!clone) clone = $.extend({}, item);
    clone.origIndex = index;
    if (currencies && currencies.map) {
      if (getSetting('enableChaosEquiv')) addChaosEquivToItem(clone);
      if (getSetting('enableMaxQtCost')) addMaxQtCostToItem(clone);
      if (getSetting('enableMaxNormCost')) addMaxNormalizedCostToItem(clone);
    }
  }
  if (getSetting('enableGroupedResults')) {
    if (clone) {
      addMoreFromSameUserToItem(clone, allItems);
    } else {
      var clone2 = $.extend({}, item);
      addMoreFromSameUserToItem(clone2, allItems);
      var intersect = _.intersection(clone2.more, item.more);
      if (intersect.length != clone2.more.length || intersect.length != item.more.length) {
        debug("found more items from same user for item "+item.id, clone2, item, intersect);
        clone = clone2;
      }
    }
  }
  return clone;
};

var renderEnhancedItem = function(item, data, localId, resultId) {
  debug("renderEnhancedItem.item to render: ", item, data, localId, resultId);
  if (getSetting('enableChaosEquiv')) renderChaosEquiv(item, data, localId, resultId);
  if (getSetting('enableMaxQtCost')) renderMaxQt(item, data, localId, resultId);
  if (getSetting('enableMaxNormCost')) renderMaxNormalized(item, data, localId, resultId);
  if (getSetting('enableGroupedResults')) renderMoreFromSameUser(item, data, localId, resultId);
};

//sortKey: "chaosEquivalent", localId: "search_1", resultId: "result_2"
var sortItems = function(sortKey, localId, resultId, items, showAutoSortMessage) {
  if (!fullyLoaded[localId]) fullyLoaded[localId] = {};
  if (fullyLoaded[localId].sortKey == sortKey) {
    fullyLoaded[localId].ascending = !fullyLoaded[localId].ascending;
  } else {
    fullyLoaded[localId].sortKey = sortKey;
    fullyLoaded[localId].ascending = ASC;
  }

  var search = getSearch(localId);
  var results = getResults(search, resultId);
  var result = results.result.slice();
  debug(`sortItems.sorting results by ${sortKey} ${(fullyLoaded[localId].ascending?'ascending':'descending')}`);

  var compFields = [{field: sortKey, direction: (fullyLoaded[localId].ascending?'asc':'desc')}];
  if (getSetting('secondarySortByStockSize')) {
    compFields.push({field: "listing.price.item.stock", direction: "desc"});
  }

  result = result.sort(function(a, b) {
    var aa = items[a], bb = items[b];
    return comparator(aa, bb, compFields);
  });

  addResultMessage($(`<span>${showAutoSortMessage} </span>`), 'gs-auto-sort-message', function(div) {
    var lnk = $(`<a href="#">Click here to revert to orginal order.</a>`);
    lnk.on('click', function(e) {
      e.preventDefault();
      if (sortKey == "buyoutGrouped") {
        ungroupSameUser(true);
      }
      sortItems('origIndex', localId, resultId, items);
    });
    div.append(lnk);
    div.append(`<span> You can disable this feature in </span>`);
    var setts = $(`<a href="#">settings</a>`);
    setts.on('click', function(e) {
      e.preventDefault();
      $(document).one(`setting-frame-frame-open`, function() {
        $('#setting-frame').contents().find('#settings-tab').tab("show");
        $('#setting-frame').contents().find('#myTabContent .tab-pane.show').removeClass("show active");
        $('#setting-frame').contents().find('#settings').addClass("show active");
      });
      openFrame("setting-frame");
    });
    div.append(setts);
  });

  app.$store.commit("clearSearchResults", {
      localId: localId
  });
  app.$store.commit("addSearchResult", {
      localId: localId,
      resultId: resultId,
      id: search.id,
      result: result,
      items: items,
      total: results.total,
      inexact: results.inexact || !1
  });
  if (!fullyLoaded[localId]) fullyLoaded[localId] = {};
  fullyLoaded[localId].loaded = true;
  fullyLoaded[localId].needRender = true;
};

//sortKey: "chaosEquivalent", localId: "search_1", resultId: "result_2"
var sortFullPage = function(sortKey, localId, resultId, message) {
  if (!fullyLoaded[localId] || !fullyLoaded[localId].loaded) {
    if (!fullyLoaded[localId]) fullyLoaded[localId] = {};
    fullyLoaded[localId].loaded = false;

    var itemResultsPanel = _.find(app.$children, function(x) { return (x.$options._componentTag == "item-results-panel"); });
    app.$nextTick(function(){
      debug("loadFullPage.itemResultsPanel: ", itemResultsPanel);
      var resultSetComponent = _.find(itemResultsPanel.$children, function(x) {
        return (x.$options._componentTag == "resultset" && x.$options.propsData && x.$options.propsData.search && x.$options.propsData.search.localId == localId);
      });
      debug("loadFullPage.resultSetComponent: ", resultSetComponent);
      var search = getSearch(localId);
      var results = getResults(search, resultId);
      var tofetch = results.result.filter(function(x) {return !results.items[x];});
      debug("loadFullPage.tofetch: ", tofetch);

      var fetches = [];
      var getDeferredFetch = function(ids, retry) {
        var deferred = $.Deferred();
        var success = function(response) {
          debug("loadFullPage.DONE FETCHING: ", response);
          deferred.resolve(response);
        };
        var failure = function(error) {
          if (retry > 0) {
            debug("loadFullPage.FAIL FETCHING, RETRY " + retry, error);
            retry--;
            setTimeout(function(){
              var innerDeferred = getDeferredFetch(ids, retry);
              innerDeferred.done(success).fail(failure);
            }, 300);
          } else {
            debug("loadFullPage.FAIL FETCHING: ", error);
            deferred.reject(error);
          }
        };
        itemResultsPanel.fetchNext(search.id, ids, (search.type == "exchange"), (new $.Deferred)
        .done(success)
        .fail(failure)
        .always(function() {
          debug("loadFullPage.ALWAYS FETCHING: ", arguments);
        }));
        return deferred;
      };

      $.each( _.chunk(tofetch, 10), function( i, chunk ) {
        fetches.push(function() {return getDeferredFetch(chunk, 3);});
      });

      pacedWhen(fetches, {failureThreshold: 1, tick: getSetting('minimumRequestRate'), max: 1, modalTitle: getSetting('blockUiWhileLoading') ? "Loading all results before sorting" : null })
      .done(function(allRes) {
        fullyLoaded[localId].loaded = true;
        var allItems = $.extend({}, results.items);
        var startFrom = _.map(allItems, 'id').length;
        $.each( _.flatten(allRes), function( i, item ) {
          if (item && item.id) allItems[item.id] = item;
        });
        $.each( Object.keys(allItems), function( index, itemId ) {
          var clone = enhanceItem(allItems[itemId], index, allItems);
          allItems[itemId] = clone || allItems[itemId];
        });
        debug("loadFullPage.DONE ALL FETCHED: ", arguments, allItems);
        sortItems(sortKey, localId, resultId, allItems, message);
      })
      .fail(function () {
        debug("loadFullPage.FAIL ALL FETCHED: ", arguments);
        app.$root.$refs.toastr.Add({
            msg: app.translate("Failed to fetch the next set of trade items."),
            type: "error",
            progressbar: !1,
            timeout: 2e3
        });
      });

    });
  } else {
    var search = getSearch(localId);
    var results = getResults(search, resultId);
    sortItems(sortKey, localId, resultId, results.items, message);
  }
};

function getCurrentLeague() {
  debug("current league", app.$store.state.persistent.league);
  return app.$store.state.persistent.league;
}

function getAvailableLeagues() {
  leagues = app.static_.leagues.map(function(x) {return x.id});
};

function getSaveIcons() {
  var svicon = $(`<span class="gs-style gs-fixTips gs-save" data-tippy="Save search"><i class="fas fa-save"></i></span>`);
  var ldicon = $(`<span class="gs-style gs-fixTips gs-load" data-tippy="Load search"><i class="fas fa-folder-open"></i></span>`);
  var mticon = $(`<span class="gs-style gs-fixTips gs-multi hide" data-tippy="Multi live search"><i class="fas fa-satellite-dish"></i></span>`);
  if ($('.top .controls .controls-right').length > 0) {
    $('.top .controls .controls-right')
    .prepend(mticon.clone())
    .prepend(ldicon.clone())
    .prepend(svicon.clone());
    $('.top .controls').addClass("saveManager");
  } else {
    warn("save manager buttons not added to DOM");
  }
  return [svicon, ldicon, mticon];
}

var getSearchKey = function() {
  return searchesKey + ((app.$store.state.persistent.tab == 'exchange') ? '-exchange' : '-items');
};

var saveSearch = function() {
  var searches = getSearches();
  var name = saveFrame.contents().find('#searchName').val();
  var saveForm = function() {
    try {
      searches[name] = {
        type: app.state.tab,
        league: app.state.league,
        query: app.query.query
      };
      putSearches(searches);
      close();
    } catch(ex) {
      saveFrame.contents().find('div.row').first().append(/*html*/`
        <dic class="col-md-12 py-2">
          <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Error</h4>
            <p>An error prevented PTE from saving the current search in your browser local storage.</p>
            ${((ex.message.indexOf("exceeded the quota")>0)?'<hr><p>It appears you have exceeded your browser local storage quota. At the moment the only solution is to delete older searches.</p>':'')}
          </div>
        </div>
      `);
    }
  }
  if (!searches[name] || window.confirm(`A search named ${name} already exists. Do you want to overwrite it?`)) {
    saveForm();
  }
};

var mapExchange = function(array) {
  var map = {};
  $.each( array, function( index, val ) {
    map[val] = true;
  });
  return map;
}

var addQuickFilters = function (search, quickFilters) {
  if (!_.isEmpty(quickFilters["force-league"])) {
    search.league = quickFilters["force-league"];
  }
  if (!_.isEmpty(quickFilters["force-cost"]) && (!quickFilters["force-cost-no-override"] || (!_.has(search, "query.filters.trade_filters.filters.price.max") && !_.has(search, "query.filters.trade_filters.filters.price.min") )) ) {
    _.set(search, "query.filters.trade_filters.filters.price.max", quickFilters["force-cost"]);
    if (_.has(search, "query.filters.trade_filters.filters.price.min")) {
      delete search.query.filters.trade_filters.filters.price.min;
    }
    if (_.has(search, "query.filters.trade_filters.filters.price.option")) {
      delete search.query.filters.trade_filters.filters.price.option;
    }
  }
  return search;
};

var openSearch = function(search, newTab, target, quickFilters) {
  debug("openSearch:", search);
  var origSearch = $.extend({}, search);
  addQuickFiltersMessage(quickFilters, function() {openSearch(origSearch, newTab, target, {});});
  addQuickFilters(search, quickFilters);
  var st = $.extend({}, app.$store.state, {
    persistent: {
      league: search.league,
      tab: search.type,
      exchange: {
        fulfillable: true,
        have: search.query.have ? mapExchange(search.query.have) : {},
        want: search.query.want ? mapExchange(search.query.want) : {}
      },
      stats: search.query.stats,
      status: _.has(search, "query.status.option") ? search.query.status.option : null,
      term: _.has(search, "query.term") ? search.query.term : null,
      name: (_.has(search, "query.name.option") ? search.query.name.option : (_.has(search, "query.name") ? search.query.name : null)),
      type: (_.has(search, "query.type.option") ? search.query.type.option : (_.has(search, "query.type") ? search.query.type : null)),
      disc: _.has(search, "query.name.discriminator") ? search.query.name.discriminator : (_.has(search, "query.type.discriminator") ? search.query.type.discriminator : null),
      filters: search.query.filters || {}
    }
  });
  debug(search, app.$store.state, st);
  app.$store.replaceState(st);

  var uid = _.uniqueId('search_');
  app.$store.commit("addSearchQuery", {
      localId: uid,
      type: search.type,
      league: search.league,
      query: search.query,
      sort: {
          price: "asc"
      }
  });
  app.$store.commit("setSearchActive", {
      localId: uid
  });
  close();
};

var addQuickFiltersMessage = function(quickFilters, remove) {
  $('.results .gs-forced-filters-message').remove();
  if (!_.isEmpty(quickFilters["force-league"]) || !_.isEmpty(quickFilters["force-cost"])) {
    var league = quickFilters["force-league"], cost = quickFilters["force-cost"];
    var message = `On this search you forced ${(league ? ("league to "+league+ ((cost) ? " and" : "")) : "")} ${(cost ? ("maximum price of "+cost+" chaos") : "")}`;
    addResultMessage($(`<span><i class="fas fa-exclamation-triangle"></i> ${message} </span>`), 'gs-forced-filters-message', function(div) {
      div.addClass("gs-warning");
      if (remove) {
        var lnk = $(`<a href="#">remove filters</a>`);
        lnk.on('click', function(e) {
          e.preventDefault();
          remove();
        });
        div.append(lnk);
      }
    });
  }
};

var connections = {};
var msLiveUid;
var stopSocket = function (index) {
  debug("Stopped socket "+index);
  connections[index].close();
  socketStatus(index, "stopped");
};
var stopAllSockets = function () {
  $.each( connections, function( i, c ) {
    stopSocket(i);
  });
  stopLiveConsole();
  var itemResultsPanel = _.find(app.$children, function(x) { return (x.$options._componentTag == "item-results-panel"); });
  itemResultsPanel.resetLiveSearch();
};
var resetConnections = function () {
  stopAllSockets();
  connections = {};
  $('.gs-style.live-search').remove();
};

var openMultiSearch = function(searches, names, live, quickFilters) {
  debug("MultiLive searches", searches);
  app.$store.commit("resetActiveUnreadHits", null);
  app.$store.commit("removeCurrentSearch", null);
  resetConnections();

  $('div.top ~ div.clear')
  .before(`
    <div class="gs-style alert-box live-search">
        Multi Live search: <span id="ms-console-holder"></span>
    </div>
  `);
  var closeLink = $('<a onclick="return false;">Close</a>');
  closeLink.on('click', function () {
    msConsoleStopped = true;
    app.$store.commit("clearSearchForm", true);
    app.$store.commit("setLiveSearchConnected", false);
    window.location = (""+window.location).replace(/^(.*(:?search|exchange)\/[^\/]+)\/(.*)$/,"$1");
    resetConnections();
  });
  $('#ms-console-holder').after(closeLink);
  closeLink.wrap('<span class="gs-pull-right">');
  setupMultiSearchConsole($('#ms-console-holder'), names);

  var fetches = [];
  var getDeferredSearchId = function(name, search, retry) {
    addQuickFilters(search, quickFilters);
    var deferred = $.Deferred();
    

    setTimeout(function(){
      var success = function(response) {
        response.search = search;
        debug("getDeferredSearchId.DONE FETCHING: "+name, response);
        deferred.resolve(response);
      };
      var failure = function(error) {
        if (retry > 0) {
          debug("getDeferredSearchId.FAIL FETCHING, RETRY " + retry + " - "+name, error);
          retry--;
          setTimeout(function(){
            var innerDeferred = getDeferredSearchId(name, search, retry);
            innerDeferred.done(success).fail(failure);
          }, 300);
        } else {
          debug("getDeferredSearchId.FAIL FETCHING: "+name, error);
          deferred.reject(error);
        }
      };
      var payload = (app.$store.state.persistent.tab == 'exchange') ? {
        exchange: search.query
      } : {
        query: search.query,
        sort: search.sort
      };
      app.$root.service[(app.$store.state.persistent.tab == 'exchange')?'performExchangeSearch':'performSearch'](search.league, payload, (new $.Deferred)
      .done(success)
      .fail(failure)
      .always(function() {
        debug("getDeferredSearchId.ALWAYS FETCHING: "+name, arguments);
      }));
    }, (4-retry)*300);
    return deferred;
  };

  var fixSearchParam = function(val) {
    if (val) {
      if (_.isArray(val) && val.length > 0) {
        return val[0];
      } else {
        return val;
      }
    } else {
      return null;
    }
  };

  $.each( searches, function( i, search ) {
    var s = {
      league: fixSearchParam(search.league),
      query: fixSearchParam(search.query),
      sort: fixSearchParam(search.sort)
    }
    fetches.push(function() {return getDeferredSearchId(names[i], s, 3);});
  });

  pacedWhen(fetches, {failureThreshold: 1, tick: getSetting('minimumRequestRate'), max: 1 })
  .done(function(resources) {
    debug("getDeferredSearchId.DONE ALL FETCHED: ", resources);
    msLiveUid = _.uniqueId('search_');
    var srcType = {type: "search", league: getCurrentLeague(), query: {status:{option:"any"},term:""+(new Date()).getTime(),stats:[{type:"and",filters:[]}]}};
    debug("setting search query to", srcType);
    app.$store.commit("addSearchQuery", {
        localId: msLiveUid,
        live: false,
        type: srcType.type,
        league: srcType.league,
        query: srcType.query,
        sort: {
            price: "asc"
        }
    });
    app.$store.commit("setSearchActive", {
        localId: msLiveUid
    });
    app.$store.commit("showAdvancedSearch", false);
    app.$store.commit("setLiveSearchStatus", "connected");
    addQuickFiltersMessage(quickFilters, function() {openMultiSearch(searches, names, live, {});});
    startAllSockets(resources);
  })
  .fail(function () {
    debug("getDeferredSearchId.FAIL ALL FETCHED: ", arguments);
    $.each( searches, function( i, search ) {
      socketStatus(i, "failed", "fetching");
    });
    app.$root.$refs.toastr.Add({
        msg: app.translate("Failed to get all search ids."),
        type: "error",
        progressbar: !1,
        timeout: 2e3
    });
  });
  close();
};

var startAllSockets = function (resources) {
  startLiveConsole();
  pacedWhen(resources.map(function(res, index) {
    return function() {
      var deferred = $.Deferred();
      var connection = startSocket(index, res);
      deferred.resolve(connection);
      return deferred;
    }
  }), {failureThreshold: 1, tick: getSetting('minimumRequestRate'), max: 1 })
  .done(function(conns) {
    debug("all connections launched", conns);
  })
  .fail(function () {
    debug("connections start failed", arguments);
  });
};

var startSocket = function(index, res) {
  if (res) {
    fetchedSocket(index, res);
    var connection, failed = true;
    try {
      connection = new WebSocket("wss://" + location.host + "/api/trade/live/" + res.search.league + "/" + res.id);
    } catch(e) {
      failed = true;
    }

    connection.onopen = function(event) {
      // e.$store.commit("setLiveSearchConnected", !0)
      debug("WS - Opened connection to: "+res, event);
      socketStatus(index, "connected");
    };
    connection.onmessage = function(r) {
      failed = false;
      debug("WS - message from:" + res, r);
      socketStatus(index, "working");
      var n = JSON.parse(r.data);
      log(n);
      if (n.new) {
        n = n.new;
        var s = _.uniqueId("result_");
        app.$store.commit("addSearchResult", {
          localId: msLiveUid,
          resultId: s,
          id: res.id,
          result: n,
          total: n.length
        }), app.$root.notify(n.length), app.$store.commit("incrementActiveUnreadHits")
      }
    };
    connection.onclose = function(event) {
      // e.$store.commit("setLiveSearchConnected", !1), e.connection = null
      socketStatus(index, failed ? "failed" : "stopped", failed ? "connecting - might be a search for an old league" : "");
      warn("WS - Error from: "+res, event);
    };
    connections[index] = connection;
    return connection;
  } else {
    socketStatus(index, "failed", "fetching");
    return null;
  }
};

  var leagues = [], currencies, isCurr, ASC = true, DESC = false;

var _initPageOrig = initPage;
initPage = function(loc) {
  isCurr = isCurrencySearch(loc);
  $(document).on(`setting-frame-frame-open`, function() {
    $('#setting-frame').contents().find('#settings')
    .toggleClass("currencySettings", isCurr)
    .toggleClass("itemSettings", !isCurr);
  });
  _initPageOrig.apply(this, arguments);
};

function isItemSearch(url) {
   return /^[^\.]*poe\.trade\/?.*/.test(url);
}
function isCurrencySearch(url) {
  debug(url, "isCurrencySearch");
   return /^.*currency\.poe\.trade\/?.*/.test(url);
}
function isPoeOfficialItemSearch(url) {
   return /^[^\.]*www\.pathofexile\.com\/trade\/search\/?.*/.test(url);
}

function resetCurrency(league) {
  if (league) {
    var curr = JSON.parse(localStorage.getItem(namespace+".currencies"));
    delete curr[league];
    localStorage.setItem(namespace+".currencies", JSON.stringify(curr));
  } else {
    localStorage.setItem(namespace+".fixedCurrenciesChanges", JSON.stringify({}));
  }
};

function setCurrencyValue(league, key, value) {
  if (league) {
    var curr = JSON.parse(localStorage.getItem(namespace+".currencies"));
    if (!curr[league].map[key].originalChaosEquiv) {
      curr[league].map[key].originalChaosEquiv = curr[league].map[key].chaosEquivalent;
    }
    curr[league].map[key].chaosEquivalent = value;
    if (curr[league].map[key].originalChaosEquiv === curr[league].map[key].chaosEquivalent) {
      delete curr[league].map[key].originalChaosEquiv;
    }
    localStorage.setItem(namespace+".currencies", JSON.stringify(curr));
  } else {
    var changes = JSON.parse(localStorage.getItem(namespace+".fixedCurrenciesChanges")) || {};
    changes[key] = value;
    if (changes[key] == FIXED_CURRENCY_VALUES.map[key].chaosEquivalent) {
      delete changes[key];
    }
    localStorage.setItem(namespace+".fixedCurrenciesChanges", JSON.stringify(changes));
  }
};

function getCurrencies(league, cb) {
  var doLoadCurrencies = getSetting('enableCurrencyLoad');
  if (doLoadCurrencies) {
    var updated, leaguesToRemove = [], curr = JSON.parse(localStorage.getItem(namespace+".currencies"));
    if (leagues) {
      $.each( curr, function( ll, value ) {
        if (!leagues.find(function(x) {
          return x == ll;
        })) {
          leaguesToRemove.push(ll);
        }
      });
      if (leaguesToRemove.length > 0) {
        $.each( leaguesToRemove, function( i, ll ) {
          delete curr[ll];
        });
        localStorage.setItem(namespace+".currencies", JSON.stringify(curr));
      }
    }
    debug(curr, "curr from localstorage");
    if (curr) curr = curr[league];
    debug(curr, "curr of ["+league+"] from localstorage");
    if (curr && curr.updated) updated = moment(curr.updated);
    var maxAge = getSetting('currencyMaxAge');
    if (!curr || !updated || (maxAge > 0 && moment.duration(moment().diff(updated)).asHours() >= maxAge)) {
      debug('currencies from poe.ninja not found in session or older then '+maxAge+' hours');
      var getDeferred = function(url) {
        var deferred = $.Deferred();
        GM_xmlhttpRequest({
          method: "GET",
          url: url,
          onload: function (response) {
            deferred.resolve(response);
          },
          onerror: function (error) {
            deferred.fail(error);
            debug(error);
          }
        });
        return deferred;
      };
      $.when(
        getDeferred("https://poe.ninja/api/data/currencyoverview?league="+league+"&type=Currency&date="+moment().format("YYYY-MM-DD")),
        getDeferred("https://poe.ninja/api/data/currencyoverview?league="+league+"&type=Fragment&date="+moment().format("YYYY-MM-DD")),
        getDeferred("https://poe.ninja/api/data/itemoverview?league="+league+"&type=Scarab&date="+moment().format("YYYY-MM-DD"))
      ).then(function () {
        curr = {map: {}, lines: [], currencyDetails: []};
        $.each( arguments, function( i, response ) {
          debug("GM_xmlhttpRequest response", response);
          if (response.responseText) {
            var c = JSON.parse(response.responseText);
            curr.updated = moment().valueOf();
            if (c.currencyDetails) {
              curr.currencyDetails = _.uniqBy(curr.currencyDetails.concat(c.currencyDetails), 'id');
            }
            if (c.lines) {
              curr.lines = _.uniqBy(curr.lines.concat(_.map(c.lines, function(x) {
                if (!x.currencyTypeName) {
                  x.currencyTypeName = x.name;
                }
                if (!x.chaosEquivalent) {
                  x.chaosEquivalent = x.chaosValue;
                }
                return x;
              })), 'currencyTypeName');
            }
          } else {
            console.log("unable to load Poe.Ninja values for league: "+league);
            debug(response);
          }
        });
        if (curr.lines.length > 0) {
          $.each(curr.lines, function( index, val ) {
            curr.map[_.kebabCase(val.currencyTypeName)] = val;
            if (val.currencyTypeName == "Timeless Eternal Emblem") {
              var clone = $.extend({}, val);
              clone.currencyTypeName == "Timeless Eternal Empire Emblem"
              curr.map[_.kebabCase(clone.currencyTypeName)] = clone;
            }
          });
          var sets = [
            {set:"Shaper Set", fragments:["fragment-of-the-chimera","fragment-of-the-hydra","fragment-of-the-minotaur","fragment-of-the-phoenix"]},
            {set:"Pale Court Set", fragments:["volkuurs-key","yriels-key","inyas-key","ebers-key"]},
            {set:"Mortal Set", fragments:["mortal-grief","mortal-hope","mortal-ignorance","mortal-rage"]},
            {set:"Sacrifice Set", fragments:["sacrifice-at-dawn","sacrifice-at-dusk","sacrifice-at-midnight","sacrifice-at-noon"]}
          ];
          $.each( sets, function( i, set ) {
            if (set.fragments.length == set.fragments.filter(function(x) {return curr.map[x];}).length) {
              var sum = 0;
              $.each( set.fragments, function( j, fragment ) {
                sum += curr.map[fragment].chaosEquivalent;
              });
              var setObject = {
                currencyTypeName: set.set,
                chaosEquivalent: (Math.round(sum*100)/100)
              };
              curr.map[_.kebabCase(set.set)] = setObject;
              curr.lines.push(setObject);
            }
          });
          curr.lines = curr.lines.sort(function(a, b) {
            return b.chaosEquivalent - a.chaosEquivalent;
          });
          debug(curr, "currencies from poe.ninja");
          var ccc = JSON.parse(localStorage.getItem(namespace+".currencies"));
          if (!ccc) ccc = {};
          ccc[league] = curr;
          var toDelete = [];
          $.each( ccc, function( k, v ) {
            if ( !v.updated || (maxAge > 0 && moment.duration(moment().diff(v.updated)).asHours() >= maxAge) ) {
              toDelete.push(k);
            }
          });
          $.each( toDelete, function( i, k ) {
            delete ccc[k];
          });
          localStorage.setItem(namespace+".currencies", JSON.stringify(ccc));
          cb(curr);
        } else {
          cb(null);
        }
      },function () {
        console.log("unable to load Poe.Ninja values");
        debug("GM_xmlhttpRequest errors", arguments);
        cb(null);
      });
    } else {
      debug(curr, "currencies taken from browser session");
      cb(curr);
    }
  } else {
    var changes = JSON.parse(localStorage.getItem(namespace+".fixedCurrenciesChanges")) || {};
    var curr = $.extend( true, {}, FIXED_CURRENCY_VALUES );
    $.each( changes, function( key, value ) {
      curr.map[key].originalChaosEquiv = curr.map[key].chaosEquivalent;
      curr.map[key].chaosEquivalent = value;
    });
    cb(curr);
  }
}

function initCurrencyTables(iframe) {
  var generateCurrencyTable = function(l, lid) {
    var tbl = $(`<table id="curr-table-${lid}" class="table table-sm table-hover curr-table">
      <thead>
        <tr>
          <th scope="col">Currency</th>
          <th scope="col">Chaos equivalent</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>`);
    iframe.contents().find(`#${lid}-pane`).empty().append(tbl);
    var tbody = iframe.contents().find(`#curr-table-${lid} tbody`);
    getCurrencies(l, function(curr) {
      if (curr && curr.map && curr.lines) {
        $.each( curr.lines, function( i, value ) {
          var details = curr.currencyDetails.find(function(x) {
            return x.name === value.currencyTypeName;
          });
          var key = _.kebabCase(value.currencyTypeName);
          tbody.append(`<tr>
            <td><img src="${((details && details.icon) ? details.icon : value.icon)}" /> ${value.currencyTypeName}</td>
            <td><span id="${lid}-${value.detailsId}">${value.chaosEquivalent}</span>${((value.originalChaosEquiv) ? ' <span title="original value was '+value.originalChaosEquiv+'"><i class="fas fa-exclamation-triangle"></i></span>' : "")}</td>
          </tr>`);
          iframe.contents().find(`#${lid}-${value.detailsId}`).editable("click", function(e) {
            setCurrencyValue(l, key, Number(e.value));
            generateCurrencyTable(l, lid);
          });
        });
        if (l) {
          iframe.contents().find(`#${lid}-pane`).prepend(`<p>Last update at ${moment(curr.updated).format("HH:mm")} - ${(getSetting('currencyMaxAge')>0) ? "Values will be refreshed after "+moment(curr.updated).add(getSetting('currencyMaxAge'), 'h').format("HH:mm") : "Max age set to 0, can only be refreshed manually"} - </p>`);
        } else {
          iframe.contents().find(`#${lid}-pane`).prepend(`<p></p>`);
        }
        var refreshButton = $(`<a href="#" onclick="return false;">${((l) ? 'refresh now' : 'reset all values')}</a>`);
        refreshButton.on('click', function(e) {
          e.preventDefault();
          resetCurrency(l);
          generateCurrencyTable(l, lid);
        });
        iframe.contents().find(`#${lid}-pane p:first`).append(refreshButton);
      } else {
        iframe.contents().find(`#${lid}-pane`).empty().append(`<div class="alert alert-warning" role="alert">Unable to load currency values from poe.ninja for league ${l}</div>`);
      }
    });
  };

  if (getSetting('enableCurrencyLoad')) {
    iframe.contents().find('#preloaded-tab').addClass('disabled');
    iframe.contents().find('#leagues-tab,.preloaded-info').addClass('d-none');
    iframe.contents().find('.loaded-info').removeClass('d-none');
    iframe.contents().find('#preloaded-pane').removeClass('show active');
    $.each( leagues, function( i, l ) {
      var lid = _.kebabCase(l);
      if (iframe.contents().find(`#${lid}-tab`).length === 0) {
        iframe.contents().find('#myCurrTab').append(`<li class="nav-item">
          <a class="nav-link" id="${lid}-tab" data-toggle="tab" href="#${lid}-pane" onclick="return false;" role="tab" aria-controls="${lid}-pane" aria-selected="false">${l}</a>
        </li>`);
        iframe.contents().find('#myCurrTabContent').append(`<div class="tab-pane fade" id="${lid}-pane" role="tabpanel" aria-labelledby="${lid}-tab">
          ${l} Tab
        </div>`);
      }
      iframe.contents().find(`#${lid}-tab`).on('click', function() {
        generateCurrencyTable(l, lid);
      });
    });
    iframe.contents().find(`#currency .tab-pane,#currency .nav-link`).removeClass('show active');
    iframe.contents().find(`#${_.kebabCase(getCurrentLeague())}-tab`).addClass('active').click();
    iframe.contents().find(`#${_.kebabCase(getCurrentLeague())}-pane`).addClass('show active');
  } else {
    iframe.contents().find('#preloaded-tab').removeClass('disabled');
    iframe.contents().find('#leagues-tab,.preloaded-info').removeClass('d-none');
    iframe.contents().find('.loaded-info').addClass('d-none');
    iframe.contents().find('#preloaded-pane').addClass('show active');
    iframe.contents().find('#currency .tab-pane:not(#leagues-pane):not(#preloaded-pane)').remove();
    iframe.contents().find('#currency .nav-link:not(#leagues-tab):not(#preloaded-tab)').remove();
    iframe.contents().find(`#currency .tab-pane,#currency .nav-link`).removeClass('show active');
    iframe.contents().find(`#preloaded-tab`).on('click', function() {
      generateCurrencyTable(null, "preloaded");
    });
    iframe.contents().find(`#preloaded-tab`).addClass('active').click();
    iframe.contents().find(`#preloaded-pane`).addClass('show active');
  }
  var c = JSON.parse(localStorage.getItem(namespace+".currencies"));
};

//function override
  function update_offer_numbers(y) {
    var x = y || $("#contactrange").val();
    current_offer.totalwant = x * current_offer.sellvalue;
    current_offer.totalhave = x * current_offer.buyvalue;
    $("#contactbuyval").text(current_offer.totalwant);
    $("#contactsellval").text(current_offer.totalhave);
    var msg = "@" + current_offer.ign + " Hi, I'd like to buy your " + current_offer.totalwant + " " + CURRENCY_TEXTS[current_offer.sellcurrency] + " for my " + current_offer.totalhave + " " + CURRENCY_TEXTS[current_offer.buycurrency] + " in "+getCurrentLeague()+".";
    $("#contacttext").text(msg);
    if (current_offer.stock && current_offer.totalwant > current_offer.stock) {
      $("#stockproblem").text("Unfortunate issue! " + current_offer.username + " only has " + current_offer.stock + " " + CURRENCY_TEXTS[current_offer.sellcurrency] + ". And you're asking for " + current_offer.totalwant + ".");
      $("#stockproblem").show();
    } else {
      $("#stockproblem").hide();
    }
  }

  function separateBuyout(buyout) {
    var match = /^([\d\.]+)\s(\w+.*)$/.exec(buyout);
    if (match && match.length == 3) {
      return [Number(match[1]), match[2]];
    } else {
      debug(match, "Buyout not separated");
      return null;
    }
  }

  function translateCurrency(curr) {
    switch (curr.toLowerCase()) {
      case "chaos":
      return "Chaos Orb";
      break;
      case "gemcutter":
      case "gcp":
      return "Gemcutter's Prism";
      break;
      case "fuse":
      case "fusing":
      return "Orb of Fusing";
      break;
      case "alch":
      case "alchemy":
      return "Orb of Alchemy";
      break;
      case "chrom":
      case "chrome":
      case "chromatic":
      return "Chromatic Orb";
      break;
      case "alt":
      case "alteration":
      return "Orb of Alteration";
      break;
      case "augmentation":
      return "Orb of Augmentation";
      break;
      case "jew":
      case "jewel":
      case "jeweller":
      case "jewellers":
      case "jeweller's":
      return "Jeweller's Orb";
      break;
      case "chance":
      return "Orb of Chance";
      break;
      case "wisdom":
      return "Scroll of Wisdom";
      break;
      case "chisel":
      case "cartographer":
      return "Cartographer's Chisel";
      break;
      case "scour":
      case "scouring":
      case "souring":
      return "Orb of Scouring";
      break;
      case "blessed":
      return "Blessed Orb";
      break;
      case "regret":
      return "Orb of Regret";
      break;
      case "regal":
      return "Regal Orb";
      break;
      case "divine":
      return "Divine Orb";
      break;
      case "exalted":
      case "exa":
      return "Exalted Orb";
      break;
      case "mir":
      case "mirror":
      return "Mirror of Kalandra";
      break;
      case "perandus":
      return "Perandus Coin";
      break;
      case "silver":
      return "Silver Coin";
      break;
      case "vaal":
      return "Vaal Orb";
      break;
      case "apprentice sextant":
      return "Apprentice Cartographer's Sextant";
      break;
      case "offering":
      return "Offering To The Goddess";
      break;
      case "hydra":
      case "minotaur":
      case "phoenix":
      case "chimera":
      return _.startCase("Fragment Of The " + curr);
      break;
      case "ignorance":
      case "grief":
      case "hope":
      case "rage":
      return _.startCase("Mortal " + curr);
      break;
      case "dusk":
      case "midnight":
      case "dawn":
      case "noon":
      return _.startCase("Sacrifice at " + curr);
      break;
      case "volkuur's":
      case "eber's":
      case "yriel's":
      case "inya's":
      return _.startCase(curr + " Key");
      break;
      default:
      if (currencies.map[_.kebabCase(curr)]) {
        return _.startCase(curr);
      } else {
        debug("WARNING: Can't find currency '"+curr+"'", currencies);
        return null;
      }
      break;
    }
  }

  function translateCurrencySafe(curr) {
    var t = curr;
    try {
      t = translateCurrency(curr);
    } catch(ex) {}
    return t || curr;
  }

  function getEssenceTier(name) {
    switch (name.toLowerCase()) {
      case "whispering":
      return 1;
      break;
      case "muttering":
      return 2;
      break;
      case "weeping":
      return 3;
      break;
      case "wailing":
      return 4;
      break;
      case "screaming":
      return 5;
      break;
      case "shrieking":
      return 6;
      break;
      case "deafening":
      return 7;
      break;
      default:
      throw new Error("Can't find EssenceTier '"+name+"'");
      break;
    }
  }

  function getSextantTier(name) {
    switch (name.toLowerCase()) {
      case "apprentice":
      return 1;
      break;
      case "journeyman":
      return 2;
      break;
      case "master":
      return 3;
      break;
      default:
      throw new Error("Can't find SextantTier '"+name+"'");
      break;
    }
  }

  function convertBuyout(buyout, forceQuantity) {
    var b = separateBuyout(buyout);
    if (b) {
      try {
        var curr = translateCurrency(b[1]);
        var quantity = ((forceQuantity) ? forceQuantity : b[0]);
        if (!curr) {
          return 0;
        } else if (curr == "Chaos Orb") {
          return Number(quantity);
        } else {
          if (!currencies.map[_.kebabCase(curr)]) {
            throw new Error("Can't find '"+curr+"' in poe.ninja's values");
          }
          return Number(quantity) * currencies.map[_.kebabCase(curr)].chaosEquivalent;
        }
      } catch( ex ) {
        console.log(ex);
        return 0;
      }
    } else {
      debug("Buyout not separated");
      return 0;
    }
  }

  function convertBuyoutWithRest(buyout) {
    var b = separateBuyout(buyout);
    if (b) {
      try {
        var curr = translateCurrency(b[1]);
        var quantity = b[0];
        if (!curr) {
          return null;
        } else if (curr == "Chaos Orb") {
          return null;
        } else {
          if (!currencies.map[_.kebabCase(curr)]) {
            throw new Error("Can't find '"+curr+"' in poe.ninja's values");
          }
          var cEq = currencies.map[_.kebabCase(curr)].chaosEquivalent;
          var rest = ((cEq > 1) ? quantity % 1 : 0);
          if (rest > 0) {
            var result = {integ: Math.floor(quantity), rest: rest, curr: curr, chaosEquivalent: cEq};
            if (quantity % 1 >= 0.5) {
              result.buyWithRest = (1 - (quantity % 1));
            }
            return result;
          } else {
            return null;
          }
        }
      } catch( ex ) {
        console.log(ex);
        return null;
      }
    } else {
      debug("Buyout not separated");
      return [];
    }
  }

  function getCurrency(buyout) {
    var b = separateBuyout(buyout);
    if (b) {
      try {
        var curr = translateCurrency(b[1]);
        if (!curr) {
          return b[1];
        } else {
          return curr;
        }
      } catch( ex ) {
        console.log(ex);
        return null;
      }
    } else {
      debug("Buyout not separated");
      return null;
    }
  }

  function endsWithOneOf(str, list) {
    var re = new RegExp("\\s("+list.join("|")+")$","i");
    var match = re.exec(str);
    if (match && match.length > 0) {
      return match[1];
    }
    return null;
  }

  function getTier(name) {
    var tierName, match = /^(Whispering|Muttering|Weeping|Wailing|Screaming|Shrieking|Deafening) Essence of/.exec(name);
    if (match && match.length == 2) {
      tierName = match[1];
      return [getEssenceTier(tierName), 7];
    }
    match = /^(Journeyman|Apprentice|Master) Cartographer's Sextant/.exec(name);
    if (match && match.length == 2) {
      tierName = match[1];
      return [getSextantTier(tierName), 3];
    }
    return [];
  }

  function getChaosEquivTip(buyout, currency, lastCharacterName) {
    var sellOneValue = convertBuyout(buyout, 1);
    var withRest = convertBuyoutWithRest(buyout);
    var tip = $(`<div>
      <small class="${currency == 'Chaos Orb' ? 'hide' : ''}">1 ${currency} = ${(Math.round(sellOneValue*100)/100)} chaos / 1 chaos = ${(Math.round((1/sellOneValue)*10000)/10000)} ${currency}</small>
      <br class="${currency == 'Chaos Orb' ? 'hide' : ''}" />
      <small class="${withRest === null ? 'hide' : 'bold'}">${((withRest) ? withRest.integ : "")} ${currency} + ${((withRest) ? (Math.round((withRest.rest*withRest.chaosEquivalent)*100)/100) : "")} chaos</small>
      <br class="${withRest === null ? 'hide' : ''}" />
      click to sort for current poe.ninja values</div>`);
    if (withRest && withRest.buyWithRest && lastCharacterName) {
      var spn = $('<a href="#" class="nowrap">ask to buy with rest</a>');
      tip.find("br").last()
      .after("<br />")
      .after(spn);

      spn.on('click', function(e) {
        e.preventDefault();
        copyToClipboard(`@${lastCharacterName} can I pay ${withRest.integ + 1} ${currency} and receive the rest of ${Math.floor(withRest.buyWithRest*withRest.chaosEquivalent)} chaos?`);
      });
    }

    return tip;
  }

  function getCurrencyChaosEquivTip(tot, cada, sellcurrency, buycurrency) {
    var sellOneValue = convertBuyout("1 "+sellcurrency);
    var buyOneValue = convertBuyout("1 "+buycurrency);
    var translated = translateCurrencySafe(sellcurrency);
    var buycurrTranslated = translateCurrencySafe(buycurrency);
    var tip = $(`<div>1 ${translated} for ${(Math.round(cada*100000)/100000)} chaos
      <br />total trade value ${(Math.round(tot*100)/100)} chaos
      <br /><small>calculated using current poe.ninja values:</small>
      <br class="${translated == 'Chaos Orb' ? 'hide' : ''}" /><small class="${translated == 'Chaos Orb' ? 'hide' : ''}">1 ${translated} = ${(Math.round(sellOneValue*100)/100)} chaos / 1 chaos = ${(Math.round((1/sellOneValue)*10000)/10000)} ${translated}</small>
      <br class="${buycurrTranslated == 'Chaos Orb' ? 'hide' : ''}" /><small class="${buycurrTranslated == 'Chaos Orb' ? 'hide' : ''}">1 ${buycurrTranslated} = ${(Math.round(buyOneValue*100)/100)} chaos / 1 chaos = ${(Math.round((1/buyOneValue)*10000)/10000)} ${buycurrTranslated}</small>
      <br />click to sort for current poe.ninja values</div>`);
    return tip;
  }

  var searchesKey = "gs-poetrade-searches";
var saveIcon, loadIcon, multiIcon;
var saveFrame, loadFrame, multiFrame;
var saveManagerInitialized = false;
var close = function() {
  closeFrame('save-frame');
  closeFrame('load-frame');
  closeFrame('multi-frame');
};

/**
* Updates a key/valueArray with the given property and value. Values will always be stored as arrays.
*
* @param prop The property to add the value to.
* @param value The value to add.
* @param obj The object to update.
* @returns {object} Updated object.
*/
function updateKeyValueArray( prop, value, obj ) {
  var current = obj[ prop ];

  if ( current === undefined ) {
    obj[ prop ] = [ value ];

  } else {
    current.push( value );
  }

  return obj;
}

/**
* Normalize the provided data into a key/valueArray store.
*
* @param data The data provided by the user to the plugin.
* @returns {object} The data normalized into a key/valueArray store.
*/
function deserialize( data ) {
  var normalized = {};
  var rPlus = /\+/g;

  // Convert data from .serializeObject() notation
  if ( $.isPlainObject( data ) ) {
    $.extend( normalized, data );

    // Convert non-array values into an array
    $.each( normalized, function( name, value ) {
      if ( !$.isArray( value ) ) {
        normalized[ name ] = [ value ];
      }
    });

    // Convert data from .serializeArray() notation
  } else if ( $.isArray( data ) ) {
    $.each( data, function( index, field ) {
      updateKeyValueArray( field.name, field.value, normalized );
    });

    // Convert data from .serialize() notation
  } else if ( typeof data === "string" ) {
    $.each( data.split( "&" ), function( index, field ) {
      var current = field.split( "=" );
      var name = decodeURIComponent( current[ 0 ].replace( rPlus, "%20" ) );
      var value = decodeURIComponent( current[ 1 ].replace( rPlus, "%20" ) );
      updateKeyValueArray( name, value, normalized );
    });
  }

  return normalized;
}

function serialize( data ) {
  var pairs = _.toPairs(data);
  var toJoin = [];
  for (var i = 1; pairs.filter(function(x){ return x.length > 1 && x[1].length >= i}).length > 0; i++) {
    var filteredPairs = pairs.filter(function(x){ return x.length > 1 && x[1].length >= i});
    for (var n = 0; n < filteredPairs.length; n++) {
      if (filteredPairs[n].length == 2) {
        toJoin.push(filteredPairs[n][0] + "=" + filteredPairs[n][1][i-1]);
      }
    }
  }
  return toJoin.join("&");
}

var getSearchProperties = function() {
  var searches = localStorage.getItem(getSearchKey()+"-colors");
  if (!searches) {
    searches = {};
  } else {
    searches = JSON.parse(searches);
  }
  return searches;
};
var putSearchProperties = function(searches) {
  localStorage.setItem(getSearchKey()+"-colors", JSON.stringify(searches));
};
var getSearches = function() {
  var searches = localStorage.getItem(getSearchKey());
  if (!searches) {
    searches = {};
  } else {
    searches = JSON.parse(searches);
  }
  return searches;
};
var putSearches = function(searches) {
  localStorage.setItem(getSearchKey(), JSON.stringify(searches));
};
var renameSearch = function(oldName, newName) {
  if (oldName !== newName) {
    var searches = getSearches();
    Object.defineProperty(searches, newName, Object.getOwnPropertyDescriptor(searches, oldName));
    delete searches[oldName];
    putSearches(searches);
    loadSearches();
  }
};
var colorSearch = function(name, color) {
  var searches = getSearchProperties();
  if (!searches[name]) {
    searches[name] = {};
  }
  searches[name].color = color;
  putSearchProperties(searches);
};
var deleteSearch = function(name) {
  var searches = getSearches();
  if (searches[name]) {
    delete searches[name];
    putSearches(searches);
  }
};

var importSearch = function(text, overwrite) {
  debug(text);
  debug(overwrite);
  try {
    var newSearches = JSON.parse(text);
    if (typeof newSearches !== "object") {
      throw new Error("Imported JSON not a JS object");
    }
    var searches = overwrite ? {} : getSearches();
    $.each( Object.keys(newSearches), function( i, k ) {
      searches[k] = newSearches[k];
    });
    putSearches(searches);
    loadSearches();
  } catch(ex) {
    console.log(ex.message);
    loadFrame.contents().find('div.row').first().append(/*html*/`
      <dic class="col-md-12 py-2">
        <div class="alert alert-danger" role="alert">
          <h4 class="alert-heading">Error</h4>
          <p>An error prevented PTE from importing your searches.</p>
        </div>
      </div>
    `);
  }
  // if (oldName !== newName) {
  //   var searches = getSearches();
  //   Object.defineProperty(searches, newName, Object.getOwnPropertyDescriptor(searches, oldName));
  //   delete searches[oldName];
  //   putSearches(searches);
  //   loadSearches();
  // }

};

var loadTypeaheadSearches = function() {
  debug("typeahead");
  $("#searchName", saveFrame[0].contentWindow.document).typeahead('destroy');
  $("#searchName", saveFrame[0].contentWindow.document).typeahead({
    source: Object.keys(getSearches()).sort(),
    item: '<li class="dropdown-item"><a class="dropdown-item" href="#" role="option"></a></li>',
    autoSelect: false
  });
};

var checkMultiSelected = function () {
  multiFrame.contents().find('#multi-live').prop('disabled', $("#search-list .form-check-input:checked", multiFrame[0].contentWindow.document).length === 0);
}

var loadMultiSearches = function(retryed) {
  //TODO: text for no results
  //TODO: filter list by other meta data
  //TODO: tooltip significant search params
  multiFrame.contents().find('#search-list').empty();

  var searches = getSearches();
  var lastMulti = getSetting("last-multiLive");

  $.each( Object.keys(searches).sort(), function( i, k ) {
    debug(`loading search ${i} - ${k}`);
    var row = $(`<tr></tr>`);
    row.data("name", k);
    row.data("params", deserialize(searches[k]));

    var chk = $(`<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="${k}"${((lastMulti && lastMulti.indexOf(k)>=0)?' checked':'')}>
  <label class="form-check-label" for="${k}">
    ${k}
  </label>
</div>`);
    row.append(chk);
    chk.wrap('<td>');

    multiFrame.contents().find('#search-list').append(row);
  });
  if (Object.keys(searches).length <= 0) {
    multiFrame.contents().find('#no-searches-alert').removeClass("d-none");
  } else {
    multiFrame.contents().find('#no-searches-alert').addClass("d-none");
  }

  $("#search-list .form-check-input", multiFrame[0].contentWindow.document).on('change', checkMultiSelected);
  checkMultiSelected();
  setupSearchAdditions(multiFrame);

  if (!retryed && Object.keys(searches).length > 0 && multiFrame.contents().find('#search-list tr').length === 0) {
    debug(`Retrying to load saved searches. Search list appear to be empty even if there are searches to show.`);
    loadMultiSearches(true);
  }
};

var loadSearches = function(retryed) {
  //TODO: text for no results
  //TODO: filter list by other meta data
  //TODO: tooltip significant search params
  loadFrame.contents().find('#search-list').empty();

  var searches = getSearches();
  var searchProperties = getSearchProperties();
  var colorsImage = new Image();
  colorsImage.crossOrigin = "Anonymous";
  colorsImage.src = "https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/text-color.png";

  $.each( Object.keys(searches).sort(), function( i, k ) {
    debug(`loading search ${i} - ${k}`);
    var row = $(`<tr></tr>`);
    row.data("name", k);
    row.data("params", deserialize(searches[k]));

    var lnk = $(`<a href="#" onclick="return false;">${k}</a>`);
    lnk.on( "click", function(e) {
      openSearch(searches[k], e.ctrlKey, null, getSearchAdditions(loadFrame));
    });
    row.append(lnk);
    lnk.wrap('<td>');

    var ren = $(`<a href="#" onclick="return false;" title="rename"><i class="fas fa-edit"></i></a>`);
    ren.on( "click", function(e) {
      $("#renameName", loadFrame[0].contentWindow.document).val(k);
      $("#renameButton", loadFrame[0].contentWindow.document).one('click', function() {
        renameSearch(k, $("#renameName", loadFrame[0].contentWindow.document).val());
        $("#renameModal", loadFrame[0].contentWindow.document).modal('hide');
      });
      $("#renameModal", loadFrame[0].contentWindow.document).modal('show');
    });
    row.append(ren);
    ren.wrap('<td>');

    var cpic = $(getColorPickerTemplate());
    row.append(cpic);
    cpic.wrap('<td>');
    cpic.tinycolorpicker({image: colorsImage, color: ((searchProperties[k] && searchProperties[k].color) ? searchProperties[k].color : null)});
    cpic.on( "change", function(e, colorHex, colorRGB) {
      debug(arguments);
      colorSearch(k, colorHex);
    });

    var del = $(`<a href="#" onclick="return false;" title="delete"><i class="fas fa-trash"></i></a>`);
    del.on( "click", function(e) {
      deleteSearch(k);
      row.remove();
    });
    row.append(del);
    del.wrap('<td>');

    loadFrame.contents().find('#search-list').append(row);
  });
  setupSearchAdditions(loadFrame);
  if (!retryed && Object.keys(searches).length > 0 && loadFrame.contents().find('#search-list tr').length === 0) {
    debug(`Retrying to load saved searches. Search list appear to be empty even if there are searches to show.`);
    loadSearches(true);
  }

};

var multiFrameContent = /* html */ `
<div class="container fixed-top">
  <div class="row">
    <form class="col-md-12 py-2 mb-0">
      <h5>Multi live search</h5>
      <div class="input-group">
        <input type="text" class="form-control border-primary" name="searchName" id="searchName" placeholder="Filter list..." autocomplete="off" />
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2"><i class="fas fa-filter"></i></span>
        </div>
      </div>
    </form>
  </div>
</div>
<div class="container middle-list">
  <div class="row">
    <div class="col">
      <button id="check-all" class="btn btn-xs" type="button" name="button" tippy="Select all"><i class="far fa-check-square"></i> all</button>
      <button id="check-none" class="btn btn-xs" type="button" name="button" tippy="Deselect all"><i class="far fa-square"></i> none</button>
    </div>
    <div class="col-5" id="search-additions-force-cost">
    </div>
    <div class="col" id="search-additions-force-league">
    </div>
  </div>
  <div class="row pb-5">
    <div class="col-md-12 table-responsive">
      <div class="alert alert-warning d-none" role="alert" id="no-searches-alert">
        You need to save at least one search to use this feature
      </div>
      <table class="table table-sm" id="search-list">
      </table>
    </div>
  </div>
</div>
<div class="container fixed-bottom py-2 border-top">
  <div class="row justify-content-end">
    <div class="col-4 col-md-3">
      <button id="multi-live" type="button" class="btn btn-primary">
        Search <i class="fas fa-satellite-dish"></i>
      </button>
    </div>
    <div class="col-2">
      <button id="" type="button" class="btn btn-close">
        Close
      </button>
    </div>
  </div>
</div>
`;

var loadFrameContent = /* html */ `
<div class="modal fade" id="renameModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Rename search</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control border-primary" name="renameName" id="renameName" autocomplete="off" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="renameButton" class="btn btn-primary">Rename</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="importModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="importModalLabel">Import saved searches</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="importText">Paste text here</label>
            <textarea class="form-control" id="importText" rows="3"></textarea>
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="importOverwrite" checked>
              <label class="custom-control-label" for="importOverwrite">Remove all current saved searches while importing</label>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="doImportButton" class="btn btn-primary">Import</button>
      </div>
    </div>
  </div>
</div>
<div class="container fixed-top">
  <div class="row">
    <form class="col-md-12 pb-0">
      <h5>Load search</h5>
      <div class="input-group">
        <input type="text" class="form-control border-primary" name="searchName" id="searchName" placeholder="Filter list..." autocomplete="off" />
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2"><i class="fas fa-filter"></i></span>
        </div>
      </div>
    </form>
  </div>
</div>
<div class="container middle-list">
  <div class="row px-1">
    <div class="col" id="search-additions-force-cost">
    </div>
    <div class="col" id="search-additions-force-league">
    </div>
  </div>
  <div class="row pb-5">
    <div class="col-md-12 table-responsive">
      <table class="table table-sm" id="search-list">
      </table>
    </div>
  </div>
</div>
<div class="container fixed-bottom py-2 border-top">
  <div class="row justify-content-end">
    <div class="col">
      <button id="import" type="button" class="btn btn-primary">
        Import <i class="fas fa-upload"></i>
      </button>
      <button id="export" type="button" class="btn btn-primary">
        Export <i class="fas fa-download"></i>
      </button>
    </div>
    <div class="col-2">
      <button id="" type="button" class="btn btn-close">
        Close
      </button>
    </div>
  </div>
</div>
`;

var saveFrameContent = /* html */ `
<div class="container">
  <div class="row">
    <form class="col-md-12 py-2">
      <h5>Save search</h5>
      <div class="input-group">
        <input type="text" class="form-control typeahead border-primary" name="searchName" id="searchName" placeholder="Search name..." autocomplete="off" />
        <div class="input-group-append">
          <button id="saveButton" type="button" class="btn btn-outline-primary">
            <i class="fas fa-save"></i>
          </button>
          <button id="" type="button" class="d-none btn btn-outline-primary btn-close">
            <i class="fas fa-window-close"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
  <div class="row">
    <div class="col-md-12">
      <button id="" type="button" class="btn btn-close float-right">
        Close
      </button>
    </div>
  </div>
</div>
`;

var filterSearch = function(iframe) {
  $(iframe[0].contentWindow.document).keyup(function(e) {
    if(e.target && e.target.id == "searchName") {
      debug($(e.target).val());
      $("#search-list tr", iframe[0].contentWindow.document)
      .filter(function() {
        if ($(e.target).val() == "" || $(this).data('name').toLowerCase().indexOf($(e.target).val().toLowerCase()) >= 0) {
          $(this).removeClass("d-none");
        } else {
          $(this).addClass("d-none");
        }
      });
    }
  });
};

var addSearchAdditions = function(iframe) {
  var forceLeagueCheckbox = $(/* html */ `<div class="form-group form-check form-control-sm">
    <input type="checkbox" class="form-check-input" id="force-league">
    <label class="form-check-label" for="force-league">Force <span class="current-league"></span> league</label>
  </div>`);
  var forceMaxCostCheckbox = $(/* html */ `<div>
    <div class="nowrap">
      <label for="force-cost" class="col-form-label col-form-label-sm">force max chaos cost</label>
      <input type="number" class="form-control form-control-sm col-3 d-inline" id="force-cost">
    </div>
    <div class="form-group form-check form-control-sm">
      <input type="checkbox" class="form-check-input" id="force-cost-no-override">
      <label class="form-check-label" for="force-cost-no-override">only if not specified in search</label>
    </div>
  </div>`);
  iframe.contents().find("#search-additions-force-league").empty().append(forceLeagueCheckbox);
  iframe.contents().find("#search-additions-force-cost").empty().append(forceMaxCostCheckbox);
  iframe.contents().find("#force-league").on("click change", function () {
    setSetting(iframe.attr("id")+"-last-force-league", iframe.contents().find("#force-league").is(':checked'));
  });
  iframe.contents().find("#force-cost-no-override").on("click change", function () {
    setSetting(iframe.attr("id")+"-last-force-cost-no-override", iframe.contents().find("#force-cost-no-override").is(':checked'));
  });
  iframe.contents().find("#force-cost").on("click change", function () {
    setSetting(iframe.attr("id")+"-last-force-cost", iframe.contents().find("#force-cost").val());
  });
};

var setupSearchAdditions = function(iframe) {
  var lg = getCurrentLeague();
  if (lg) {
    var lastForceLeague = getSetting(iframe.attr("id")+"-last-force-league");
    iframe.contents().find("#search-additions-force-league .current-league").text(lg);
    iframe.contents().find("#force-league").prop("checked", ""+lastForceLeague == "true").prop("disabled", false);
  } else {
    iframe.contents().find("#search-additions-force-league .current-league").text("");
    iframe.contents().find("#force-league").prop("checked", false).prop("disabled", true);
  }
  var lastForceCost = getSetting(iframe.attr("id")+"-last-force-cost");
  var lastForceCostNoOverride = getSetting(iframe.attr("id")+"-last-force-cost-no-override");
  iframe.contents().find("#force-cost-no-override").prop("checked", ""+lastForceCostNoOverride == "true");
  iframe.contents().find("#force-cost").val(lastForceCost);
};

var getSearchAdditions = function(iframe) {
  var options = {};
  options["force-cost-no-override"] = iframe.contents().find("#force-cost-no-override").is(':checked');
  options["force-league"] = (iframe.contents().find("#force-league").is(':checked') ? getCurrentLeague() : false);
  options["force-cost"] = iframe.contents().find("#force-cost").val();
  return options;
};

var sockets = [], msConsole, msConsoleIntervalId, msConsoleStopped;

var setupMultiSearchConsole = function(holder, names, noplay) {
  msConsoleStopped = false;
  sockets = [];
  msConsole = $(/* html */ `
    <span id="ms-console"><span id="sockets-status">starting...</span> - <span id="working-sockets">0</span> of ${names.length} WebSockets working - <a id="sockets-start-all" class="hide"><i class="fas fa-play"></i> restart</a><a id="sockets-stop-all" class="hide"><i class="fas fa-stop"></i> stop</a> <span id="ms-console-tip-wrapper" class="hide"></span></span>
  `);
  holder.empty().append(msConsole);
  var tip = $(/* html */ `
    <div id="ms-console-tip"></div>
  `);
  $('#ms-console-tip-wrapper').append(tip);
  $.each( names, function( i, name ) {
    sockets.push({name: name, status: "initialized"});
    $("#ms-console-tip").append(/* html */ `
      <span id="ms-console-tip-${i}"><b>${name}</b> - <span id="ms-console-tip-status-${i}">initialized</span>&nbsp;&nbsp;&nbsp;<span id="ms-console-tip-last-${i}" class="gs-quote"></span></span><br />
    `);
    // var starter = $(/* html */ `<a class="ms-console-tip-start-${i} hide"><i class="fas fa-play"></i> restart</a>`);
    // starter.on("click", function () {
    //   startSocket(i, sockets[i].resource);
    // });
    // var stopper = $(/* html */ `<a class="ms-console-tip-stop-${i}"><i class="fas fa-stop"></i> stop</a>`);
    // stopper.on("click", function () {
    //   stopSocket(i);
    // });
    //$(`#ms-console-tip-${i}`).prepend(stopper).prepend(starter);
  });
  tippy(msConsole[0], {
    content: "",
    // trigger: 'manual',
    // showOnInit: true,
    interactive: true
  });
  msConsole[0]._tippy.setContent($('#ms-console-tip-wrapper').html());
  if (!noplay) {
    $('#sockets-stop-all').removeClass("hide");
    $('#sockets-stop-all').on("click", function () {
      $('#sockets-stop-all,#sockets-start-all').toggleClass("hide");
      msConsoleStopped = true;
      stopAllSockets();
    });
    $('#sockets-start-all').on("click", function () {
      $('#sockets-stop-all,#sockets-start-all').toggleClass("hide");
      var resources = sockets.map(function (x) {
        return x.resource;
      });
      msConsoleStopped = false;
      startAllSockets(resources);
    });
  }
};

var startLiveConsole = function() {
  msConsoleIntervalId = setInterval(updateSocketStatus, 3000);
};

var stopLiveConsole = function() {
  clearInterval(msConsoleIntervalId);
};

var fetchedSocket = function(index, res) {
  sockets[index].resource = res;
  sockets[index].status = ((res) ? "fetched" : "failed");
  sockets[index].doing = "fetching";
  updateSocketStatus();
};

var socketStatus = function(index, status, doing) {
  debug("Changing socket status:", index, status, sockets[index]);
  sockets[index].lastWasAPing = (status == "pinged");
  sockets[index].status = (status == "pinged") ? "working" : status;
  sockets[index].doing = doing;
  if (sockets[index].status == "working" ) {
    sockets[index].lastMessage = moment().valueOf();
    sockets[index].retry = null;
  } else if (status == "stopped" && !msConsoleStopped) {
    if (!sockets[index].retry) {
      sockets[index].retry = 10;
    } else {
      sockets[index].retry = Math.min(sockets[index].retry + 10, 120);
    }
    sockets[index].retry = Math.round(randomize(sockets[index].retry));
    sockets[index].retryId = setTimeout(function(){
      debug("WS - Retry connecting ["+index+"]: "+sockets[index].resource, sockets[index].name, sockets[index].retry);
      startSocket(index, sockets[index].resource);
    }, sockets[index].retry * 1000);
  }
  updateSocketStatus();
};

var updateSocketStatus = function() {
  $.each( sockets, function( i, s ) {
    $(`#ms-console-tip-status-${i}`).text(s.status);
    $(`#ms-console-tip-last-${i}`).text("");
    $(`#ms-console-tip-start-${i}`).toggleClass("hide", s.status != "stopped");
    $(`#ms-console-tip-stop-${i}`).toggleClass("hide", s.status == "stopped");
    switch (s.status) {
      case "stopped":
        $(`#ms-console-tip-${i}`).removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-danger");
        if (sockets[i].retry && !msConsoleStopped) {
          $(`#ms-console-tip-last-${i}`).text(`Reconnecting in ${sockets[i].retry} seconds`);
        }
        if (sockets[i].retryId && msConsoleStopped) {
          clearTimeout(sockets[i].retryId);
        }
        break;
      case "failed":
        $(`#ms-console-tip-${i}`).removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-danger");
        if (sockets[i].doing) {
          $(`#ms-console-tip-last-${i}`).text(`${sockets[i].doing}`);
        }
        break;
      case "fetched":
      case "connected":
        $(`#ms-console-tip-${i}`).removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-info");
        break;
      case "working":
        var lastMsg = moment(s.lastMessage || 0);
        if (!s.lastMessage) {
          $(`#ms-console-tip-last-${i}`).text("never received data from server");
        } else if (moment.duration(moment().diff(lastMsg)).asMinutes() > 1) {
          $(`#ms-console-tip-${i}`).removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-warning");
          $(`#ms-console-tip-last-${i}`).text((s.lastWasAPing ? "last ping " : "last message ")+"older then 1 minute");
        } else {
          $(`#ms-console-tip-${i}`).removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-success");
          $(`#ms-console-tip-last-${i}`).text((s.lastWasAPing ? "pinged " : "last message ")+moment.duration(moment().diff(lastMsg)).seconds()+" seconds ago");
        }
        break;
    }
  });
  var failed = sockets.filter(function (x) {
    return x.status == "failed";
  });
  var stopped = sockets.filter(function (x) {
    return x.status == "stopped";
  });
  var fetched = sockets.filter(function (x) {
    return x.status == "fetched";
  });
  var connected = sockets.filter(function (x) {
    return x.status == "connected";
  });
  var working = sockets.filter(function (x) {
    return x.status == "working";
  });
  var workingOrConnected = sockets.filter(function (x) {
    return x.status == "working" || x.status == "connected";
  });
  if (failed.length == sockets.length) {
    $(`#sockets-status`).text("failed").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-danger");
  } else if (failed.length > 0) {
    $(`#sockets-status`).text("some failed").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-warning");
  } else if (stopped.length == sockets.length) {
    $(`#sockets-status`).text("stopped").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-danger");
  } else if (stopped.length > 0) {
    $(`#sockets-status`).text("some stopped").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-warning");
  } else if (workingOrConnected.length == sockets.length) {
    $(`#sockets-status`).text("working").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-success");
  } else if (connected.length == sockets.length) {
    $(`#sockets-status`).text("connected").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-success");
  } else if (fetched.length == sockets.length) {
    $(`#sockets-status`).text("searches fetched").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-info");
  } else if (fetched.length > 0) {
    $(`#sockets-status`).text("fetching searches").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-info");
  } else if (connected.length > 0) {
    $(`#sockets-status`).text("connecting").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-info");
  } else if (working.length > 0) {
    $(`#sockets-status`).text("connecting").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-info");
  } else {
    $(`#sockets-status`).text("initialized").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-info");
  }
  msConsole[0]._tippy.setContent($('#ms-console-tip-wrapper').html());
  $('#working-sockets').text(workingOrConnected.length);

};

var createMultiFrame = function(iframe, callback) {
  multiFrame = iframe;

  iframe.contents().find('.btn-close').on('click', function() {
    closeFrame("multi-frame")
  });

  iframe.contents().find('#multi-live').on('click', function() {
    var searches = getSearches();
    var multiSearches = [], names = [];
    $("#search-list tr:has(.form-check-input:checked)", iframe[0].contentWindow.document).each(function( index ) {
      var dt = $(this).data();
      multiSearches.push(searches[dt.name]);
      names.push(dt.name);
    });
    setSetting("last-multiLive", names);
    openMultiSearch(multiSearches, names, true, getSearchAdditions(multiFrame));
  });

  filterSearch(iframe);
  addSearchAdditions(iframe);

  iframe.contents().find('#check-all').on('click', function() {
    $("#search-list .form-check-input:visible", iframe[0].contentWindow.document).prop('checked', true);
    checkMultiSelected();
  });
  iframe.contents().find('#check-none').on('click', function() {
    $("#search-list .form-check-input:visible", iframe[0].contentWindow.document).prop('checked', false);
    checkMultiSelected();
  });

  if (callback) callback();
};

var createLoadFrame = function(iframe, callback) {
  // setTimeout(function(){
  // iframe.on('load',function(){
    loadFrame = iframe;

    iframe.contents().find('.btn-close').on('click', function() {
      closeFrame("load-frame")
    });
    debug("iframe.contents().find('.btn-close')", $(".btn-close", iframe[0].contentWindow.document));
    iframe.contents().find('#export').on('click', function() {
      download("poetrade-searches.txt", localStorage.getItem(getSearchKey()));
    });

    iframe.contents().find('#import').on('click', function() {
      $("#doImportButton", iframe[0].contentWindow.document).one('click', function() {
        importSearch($("#importText", iframe[0].contentWindow.document).val(), $("#importOverwrite", iframe[0].contentWindow.document).is(":checked"));
        debug($("#importOverwrite", iframe[0].contentWindow.document));
        $("#importModal", iframe[0].contentWindow.document).modal('hide');
      });
      $("#importModal", iframe[0].contentWindow.document).modal('show');
    });

    // $("#renameModal", iframe[0].contentWindow.document).modal({show: false});
    iframe.contents().find("#renameModal").modal({show: false});
    filterSearch(iframe);
    addSearchAdditions(iframe);
    // $("#searchName", iframe[0].contentWindow.document).on("change", function() {
    // });

    if (callback) callback();
  // }, 5000);
};

var createSaveFrame = function(iframe, callback) {
  // setTimeout(function(){
  // iframe.on('load',function(){
    saveFrame = iframe;

    iframe.contents().find('.btn-close').on('click', function() {
      closeFrame("save-frame")
    });
    iframe.contents().find('#saveButton').on('click', saveSearch);

    $(iframe[0].contentWindow.document).keydown(function(e) {
      if(e.which == 13 && e.target && e.target.id == "searchName") {
        e.preventDefault();
        if ($("#searchName + ul.typeahead.dropdown-menu .dropdown-item.active", saveFrame[0].contentWindow.document).length == 0
          || !$("#searchName + ul.typeahead.dropdown-menu", saveFrame[0].contentWindow.document).first().is(":visible")) {
            saveSearch();
        }
      }
    });

    if (callback) callback();
  // }, 100);
};

var initSaveManager = function() {
  if (!saveManagerInitialized ) {
    saveManagerInitialized = true;
    [saveIcon, loadIcon, multiIcon] = getSaveIcons();

    addIframe({id:"load-frame", frameTemplate: frameTemplate, contents: loadFrameContent, trigger: ".gs-load", builder: createLoadFrame, onOpen: loadSearches}, function() {});
    addIframe({id:"save-frame", frameTemplate: frameTemplate, contents: saveFrameContent, trigger: ".gs-save", builder: createSaveFrame, onOpen: loadTypeaheadSearches}, function() {});
    addIframe({id:"multi-frame", frameTemplate: frameTemplate, contents: multiFrameContent, trigger: ".gs-multi", builder: createMultiFrame, onOpen: loadMultiSearches}, function() {});

  }
};

  function addCopyForPoB(item) {
  var name = item.data("name");
  var itemProps = {name: name, implicits:[], explicits:[]};
  var tier, maxTier;
  [tier, maxTier] = getTier(name);

  if (item.find(".title.itemframe0").length > 0) itemProps.rarity = "Normal";
  if (item.find(".title.itemframe1").length > 0) itemProps.rarity = "Magic";
  if (item.find(".title.itemframe2").length > 0) itemProps.rarity = "Rare";
  if (item.find(".title.itemframe3").length > 0) itemProps.rarity = "Unique";
  if (item.find(".title.itemframe4").length > 0) itemProps.rarity = "Normal";

  var nameForBaseItemSearch = name.replace(/\sof(\sthe)?\s\w+$/,"");
  debug(`${name} => ${nameForBaseItemSearch}`);
  var typeKey = endsWithOneOf(nameForBaseItemSearch, Object.keys(ITEM_TYPES));
  if (typeKey) {
    var baseItem = endsWithOneOf(nameForBaseItemSearch, ITEM_TYPES[typeKey]);
    if (baseItem) {
      itemProps.baseItem = baseItem;
      if (itemProps.rarity == "Rare") itemProps.name = itemProps.name.replace(new RegExp("\\s"+baseItem+"$"), "");
    }
  }

  if (!itemProps.baseItem && tier) {
    itemProps.baseItem = name;
  }

  var mapper = [
    {
      name: "requirements",
      properties: [
        {
          name: "Level",
          selector: "ul.requirements.proplist li:contains('Level:')",
          regexp: /Level:[^\d]*(\d+)/
        },
        {
          name: "Strength",
          selector: "ul.requirements.proplist li:contains('Strength:')",
          regexp: /Strength:[^\d]*(\d+)/
        },
        {
          name: "Intelligence",
          selector: "ul.requirements.proplist li:contains('Intelligence:')",
          regexp: /Intelligence:[^\d]*(\d+)/
        },
        {
          name: "Dexterity",
          selector: "ul.requirements.proplist li:contains('Dexterity:')",
          regexp: /Dexterity:[^\d]*(\d+)/
        },
        {
          name: "ItemLevel",
          selector: "ul.requirements.proplist li:contains('ilvl:')",
          regexp: /ilvl:[^\d]*(\d+)/
        }
      ]
    },
    {
      name: "stats",
      properties: [
        {
          name: "Quality",
          selector: "td.property[data-name='q']",
          regexp: /[^\d]*([\d\+\.]+)[^\d]*/
        },
        {
          name: "Armour",
          selector: "td.property[data-name='quality_armour']",
          regexp: /[^\d]*([\d\+\.]+)[^\d]*/
        },
        {
          name: "Evasion Rating",
          selector: "td.property[data-name='quality_evasion']",
          regexp: /[^\d]*([\d\+\.]+)[^\d]*/
        },
        {
          name: "Energy Shield",
          selector: "td.property[data-name='quality_shield']",
          regexp: /[^\d]*([\d\+\.]+)[^\d]*/
        },
        {
          name: "Chance to Block",
          selector: "td.property[data-name='block']",
          regexp: /[^\d]*([\d\+\.]+)[^\d]*/
        },
        {
          name: "Physical Damage",
          selector: "td.property[data-name='quality_pd']",
          regexp: /[^\d]*([\d\+\.\-]+)[^\d]*/
        },
        {
          name: "Critical Strike Chance",
          selector: "td.property[data-name='crit']",
          regexp: /[^\d]*([\d\+\.]+)[^\d]*/
        },
        {
          name: "Attacks per Second",
          selector: "td.property[data-name='aps']",
          regexp: /[^\d]*([\d\+\.]+)[^\d]*/
        },
      ]
    }
  ];
  for (var i = 0; i < mapper.length; i++) {
    var catMap = mapper[i];
    if (!itemProps[catMap.name]) {
      itemProps[catMap.name] = {};
    }
    for (var j = 0; j < catMap.properties.length; j++) {
      var props = catMap.properties[j];
      var el = item.find(props.selector);
      if (el.length > 0) {
        var match = props.regexp.exec(el.first().text());
        if (match && match.length > 0) {
          itemProps[catMap.name][props.name] = match[1];
        }
      }
    }
  }

  if (itemProps.stats.Quality && itemProps.stats.Quality.indexOf("+") >= 0) {
    itemProps.stats.Quality = "20";
  }
  if (itemProps.requirements.ItemLevel) {
    itemProps.ilvl = itemProps.requirements.ItemLevel;
    delete itemProps.requirements.ItemLevel;
  }

  item.find("ul.item-mods ul.mods.withline li").each(function( index ) {
    itemProps.implicits.push($( this ).text());
  });

  item.find("ul.item-mods ul.mods:not(.withline) li:not(.pseudo)").each(function( index ) {
    var clone = $( this ).clone();
    clone.find(".item-affix").remove();
    itemProps.explicits.push(_.trim(clone.text()));
  });

  item.find(".sockets-inner .socket,.sockets-inner .socketLink").each(function( index ) {
    if (!itemProps.sockets) {
      itemProps.sockets = "";
    }
    if ($( this ).hasClass("socket")) {
      if (itemProps.sockets != "" && !_.endsWith(itemProps.sockets, "-")) {
        itemProps.sockets += " ";
      }
    }
    if ($( this ).hasClass("socketI")) {
      itemProps.sockets += "B";
    }
    if ($( this ).hasClass("socketD")) {
      itemProps.sockets += "G";
    }
    if ($( this ).hasClass("socketS")) {
      itemProps.sockets += "R";
    }
    if ($( this ).hasClass("socketLink")) {
      itemProps.sockets += "-";
    }
  });

  if (item.find("td.item-cell h5 .corrupted").length > 0) itemProps.corrupted = true;
  debug(itemProps);
  var txt = [], separator = "--------", shortText = [];
  shortText.push(itemProps.name);
  if (itemProps.rarity) {
    txt.push("Rarity: "+itemProps.rarity);
    if (itemProps.rarity != "Normal") {
      shortText.push(itemProps.rarity);
    }
  }
  txt.push(itemProps.name);
  if (itemProps.baseItem) txt.push(itemProps.baseItem);
  txt.push(separator);
  if (Object.keys(itemProps.stats).length > 0) {
    $.each( itemProps.stats, function( key, value ) {
      txt.push( key + ": " + value + ((key.match(/(Chance|Quality)/g))?"%":""));
    });
    txt.push(separator);
  }
  if (Object.keys(itemProps.requirements).length > 0) {
    txt.push( "Requirements:" );
    $.each( itemProps.requirements, function( key, value ) {
      txt.push( key + ": " + value );
    });
    txt.push(separator);
  }
  if (itemProps.sockets) {
    txt.push("Sockets:" + itemProps.sockets);
    txt.push(separator);
  }
  if (itemProps.ilvl) {
    txt.push("Item Level:" + itemProps.ilvl);
    txt.push(separator);
    shortText.push("ilvl: "+itemProps.ilvl);
  }
  if (itemProps.implicits.length > 0) {
    $.each( itemProps.implicits, function( i, value ) {
      txt.push( value );
    });
    txt.push(separator);
  }
  if (itemProps.explicits.length > 0) {
    $.each( itemProps.explicits, function( i, value ) {
      if (i == 0 && _.startsWith(value, "enchanted ")) {
        txt.push( value.replace("enchanted ", "{crafted}") );
        txt.push( separator );
        shortText.push("Crafted");
      } else {
        txt.push( value.replace(/^crafted/,"{crafted}") );
      }
    });
    if (itemProps.corrupted) {
      txt.push("Corrupted");
      shortText.push("Corrupted");
    }
    txt.push(separator);
  }
  item.data("text", txt.join("\n"));
  item.data("shortText", shortText.join(" - "));
  debug(txt.join("\n"));
  var copyButton = $(`<a class="gs-style gs-save pob-clip-btn" data-tippy="Copy to clipboard" tabindex="0"><i class="fas fa-paste"></i></a>`);
  item.find("td.item-cell h5 .title:first").after(copyButton);

  debug(">>>>");
  debug(itemProps);
  debug(">>>>");
  if (itemProps.baseItem && item.find("td.item-cell h5 .wiki-link").length == 0) {
    item.find("td.item-cell h5 .found-time-ago").after(`<a target="_blank" class="wiki-link gs-style" href="http://pathofexile.gamepedia.com/${itemProps.baseItem}">[wiki]</a>`);
  } else if (itemProps.rarity == "Normal" && item.find("td.item-cell h5 .wiki-link").length == 0) {
    item.find("td.item-cell h5 .found-time-ago").after(`<a target="_blank" class="wiki-link gs-style" href="http://pathofexile.gamepedia.com/${itemProps.name}">[wiki]</a>`);
  }
}


  var enhanceItemSearch = function(loc) {
    debug("ITEM SEARCH!");
    initPage(loc, function(){
      debug(app);
      var league = getCurrentLeague();

      getCurrencies(league, function(curr) {
        if (getSetting('useSaveManager')) initSaveManager();
        currencies = curr;
        if (currencies && currencies.map) {
          if (_.has(app.$store.state.transient, "search.active.localId") && app.$store.state.transient.search.active.results.length > 0 && app.$store.state.transient.search.active.results[0].id && app.$store.state.transient.search.active.results[0].id && app.$store.state.transient.search.active.results[0].result.length > 0 && !itemsLoading[app.$store.state.transient.search.active.localId+'-'+app.$store.state.transient.search.active.results[0].id]) {
            warn(`app committed to changes when results for ${app.$store.state.transient.search.active.localId+'-'+app.$store.state.transient.search.active.results[0].id} where already loaded`);
            itemsLoading[app.$store.state.transient.search.active.localId+'-'+app.$store.state.transient.search.active.results[0].id] = true;
            itemsLoaded({payload:{localId:app.$store.state.transient.search.active.localId, id:app.$store.state.transient.search.active.results[0].id}});
          }
        } else {
          debug("Some features are disabled because we've been unable to load Poe.Ninja currency values.")
        }
      });
      waitFor(["app.$store.state.persistent.tab[0]"], function () {
        tabSelected(app.$store.state.persistent.tab);
      });
      if (getSetting('trackContactedOnCurrencySearches')) {
        $(document).on('click', '.slider-middle textarea', function(e) {
          var btn = $(e.target).parents('.row').first().find(".whisper-btn").prev();
          btn.addClass("copied");
          console.log(arguments, btn);
        });
      }
    });
  };

  var matchers = [
    
    { matcher: /^[^\.]*www\.pathofexile\.com\/trade.*$/, callback: enhanceItemSearch } // Item search
  ]

  waitFor([`if (!app.$data.loaded) { throw "app not loaded yet"; }`, "jQuery", "$('.loader:not(:visible)')[0].attributes"], function() {
    jQuery( document ).ready(function() {
      debug("doc ready!");
      $.each( matchers, function( i, m ) {
        if (m.matcher.test(window.location)) {
          if (DELAY > 0) {
            debug(`delay: ${DELAY}`)
            setTimeout(function(){ m.callback(window.location); }, DELAY);
          } else {
            m.callback(window.location);
          }
        }
      });
    });
  });

})();
