// ==UserScript==
// @name         poe-trade-enhancer
// @namespace    https://github.com/ghostscript3r/poe-trade-enhancer
// @version      1.4.1007
// @description  Adds tons of usefull features to poe.trade, from a very easy to use save manager to save and laod your searches and even live search them all in one page, to an auto sort by real currency values (from poe.ninja), passing from gems max quality cost and more. I have some other very good idea for features to add, I'll gladly push them forward if I see people start using this.
// @author       ghostscript3r@gmail.com | https://www.patreon.com/ghostscripter
// @license      MIT
// @connect      poe.ninja
// @match        http://poe.trade/*
// @match        https://poe.trade/*
// @match        http://currency.poe.trade/*
// @match        https://currency.poe.trade/*
// @require      https://greasyfork.org/scripts/387585-jqueryeditable/code/jqueryeditable.js?version=717975
// @require      https://greasyfork.org/scripts/373124-gm4-polyfill-mach6-legacy/code/gm4-polyfill-mach6-legacy.js?version=635792
// @require      https://cdnjs.cloudflare.com/ajax/libs/async/3.1.0/async.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js
// @require      https://unpkg.com/tippy.js@3/dist/tippy.all.min.js
// @require      https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js
// @resource     fontsCSS https://fonts.googleapis.com/css?family=Oswald|Roboto
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// ==/UserScript==



(function() {
  'use strict';

  var namespace="ghost-scripter",ITEM_TYPES={Axe:["Abyssal Axe","Arming Axe","Boarding Axe","Broad Axe","Butcher Axe","Ceremonial Axe","Dagger Axe","Decorative Axe","Despot Axe","Double Axe","Ezomyte Axe","Gilded Axe","Headsman Axe","Infernal Axe","Jasper Axe","Karui Axe","Noble Axe","Reaver Axe","Royal Axe","Shadow Axe","Siege Axe","Spectral Axe","Stone Axe","Sundering Axe","Talon Axe","Timber Axe","Vaal Axe","Void Axe","War Axe","Wraith Axe"],Sceptre:["Abyssal Sceptre","Blood Sceptre","Bronze Sceptre","Carnal Sceptre","Crystal Sceptre","Darkwood Sceptre","Driftwood Sceptre","Horned Sceptre","Iron Sceptre","Karui Sceptre","Lead Sceptre","Ochre Sceptre","Opal Sceptre","Platinum Sceptre","Quartz Sceptre","Ritual Sceptre","Royal Sceptre","Sambar Sceptre","Shadow Sceptre","Stag Sceptre","Vaal Sceptre","Void Sceptre"],Amulet:["Agate Amulet","Amber Amulet","Blue Pearl Amulet","Citrine Amulet","Coral Amulet","Gold Amulet","Jade Amulet","Jet Amulet","Lapis Amulet","Marble Amulet","Onyx Amulet","Paua Amulet","Ruby Amulet","Turquoise Amulet"],Shield:["Alder Spiked Shield","Alloyed Spiked Shield","Ancient Spirit Shield","Angelic Kite Shield","Archon Kite Shield","Baroque Round Shield","Bone Spirit Shield","Branded Kite Shield","Brass Spirit Shield","Bronze Tower Shield","Buckskin Tower Shield","Burnished Spiked Shield","Cardinal Round Shield","Cedar Tower Shield","Ceremonial Kite Shield","Champion Kite Shield","Chiming Spirit Shield","Colossal Tower Shield","Compound Spiked Shield","Copper Tower Shield","Corroded Tower Shield","Crested Tower Shield","Crimson Round Shield","Driftwood Spiked Shield","Ebony Tower Shield","Elegant Round Shield","Etched Kite Shield","Ezomyte Spiked Shield","Ezomyte Tower Shield","Fir Round Shield","Fossilised Spirit Shield","Girded Tower Shield","Harmonic Spirit Shield","Ivory Spirit Shield","Jingling Spirit Shield","Lacewood Spirit Shield","Laminated Kite Shield","Layered Kite Shield","Linden Kite Shield","Mahogany Tower Shield","Maple Round Shield","Mirrored Spiked Shield","Mosaic Kite Shield","Ornate Spiked Shield","Painted Tower Shield","Pinnacle Tower Shield","Plank Kite Shield","Polished Spiked Shield","Rawhide Tower Shield","Redwood Spiked Shield","Reinforced Kite Shield","Reinforced Tower Shield","Rotted Round Shield","Scarlet Round Shield","Shagreen Tower Shield","Sovereign Spiked Shield","Spiked Round Shield","Spiny Round Shield","Splendid Round Shield","Splintered Tower Shield","Steel Kite Shield","Studded Round Shield","Supreme Spiked Shield","Tarnished Spirit Shield","Teak Round Shield","Thorium Spirit Shield","Titanium Spirit Shield","Twig Spirit Shield","Vaal Spirit Shield","Walnut Spirit Shield","Yew Spirit Shield"],Boots:["Ambush Boots","Assassin's Boots","Bronzescale Boots","Carnal Boots","Chain Boots","Clasped Boots","Conjurer Boots","Crusader Boots","Deerskin Boots","Dragonscale Boots","Eelskin Boots","Goathide Boots","Hydrascale Boots","Ironscale Boots","Leatherscale Boots","Legion Boots","Mesh Boots","Murder Boots","Nubuck Boots","Rawhide Boots","Ringmail Boots","Riveted Boots","Scholar Boots","Serpentscale Boots","Shackled Boots","Shagreen Boots","Sharkskin Boots","Slink Boots","Soldier Boots","Sorcerer Boots","Stealth Boots","Steelscale Boots","Strapped Boots","Trapper Boots","Two-Toned Boots","Wrapped Boots","Wyrmscale Boots","Zealot Boots"],Mitts:["Ambush Mitts","Assassin's Mitts","Carnal Mitts","Clasped Mitts","Murder Mitts","Strapped Mitts","Trapper Mitts","Wrapped Mitts"],Ambusher:["Ambusher"],Flask:["Amethyst Flask","Aquamarine Flask","Basalt Flask","Bismuth Flask","Colossal Hybrid Flask","Colossal Life Flask","Colossal Mana Flask","Diamond Flask","Divine Life Flask","Divine Mana Flask","Eternal Life Flask","Eternal Mana Flask","Giant Life Flask","Giant Mana Flask","Grand Life Flask","Grand Mana Flask","Granite Flask","Greater Life Flask","Greater Mana Flask","Hallowed Hybrid Flask","Hallowed Life Flask","Hallowed Mana Flask","Jade Flask","Large Hybrid Flask","Large Life Flask","Large Mana Flask","Medium Hybrid Flask","Medium Life Flask","Medium Mana Flask","Quartz Flask","Quicksilver Flask","Ruby Flask","Sacred Hybrid Flask","Sacred Life Flask","Sacred Mana Flask","Sanctified Life Flask","Sanctified Mana Flask","Sapphire Flask","Silver Flask","Small Hybrid Flask","Small Life Flask","Small Mana Flask","Stibnite Flask","Sulphur Flask","Topaz Flask"],Ring:["Amethyst Ring","Breach Ring","Coral Ring","Diamond Ring","Gold Ring","Iron Ring","Jet Ring","Moonstone Ring","Opal Ring","Paua Ring","Prismatic Ring","Ruby Ring","Sapphire Ring","Steel Ring","Topaz Ring","Two-Stone Ring","Unset Ring"],Club:["Ancestral Club","Barbed Club","Driftwood Club","Petrified Club","Spiked Club","Tribal Club"],Gauntlets:["Ancient Gauntlets","Antique Gauntlets","Bronze Gauntlets","Bronzescale Gauntlets","Dragonscale Gauntlets","Fishscale Gauntlets","Goliath Gauntlets","Hydrascale Gauntlets","Iron Gauntlets","Ironscale Gauntlets","Plated Gauntlets","Serpentscale Gauntlets","Steel Gauntlets","Steelscale Gauntlets","Titan Gauntlets","Vaal Gauntlets","Wyrmscale Gauntlets"],Greaves:["Ancient Greaves","Antique Greaves","Goliath Greaves","Iron Greaves","Kaom's Greaves","Plated Greaves","Reinforced Greaves","Steel Greaves","Titan Greaves","Vaal Greaves"],Sword:["Ancient Sword","Bastard Sword","Battle Sword","Broad Sword","Butcher Sword","Charan's Sword","Copper Sword","Corsair Sword","Courtesan Sword","Dragoon Sword","Elder Sword","Elegant Sword","Eternal Sword","Footman Sword","Gemstone Sword","Graceful Sword","Headman's Sword","Hook Sword","Infernal Sword","Legion Sword","Lion Sword","Ornate Sword","Reaver Sword","Rusted Sword","Spectral Sword","Tiger Sword","Two-Handed Sword","War Sword","Wraith Sword"],Rapier:["Antique Rapier","Apex Rapier","Basket Rapier","Dragonbone Rapier","Harpy Rapier","Primeval Rapier","Thorn Rapier","Vaal Rapier","Whalebone Rapier","Wyrmbone Rapier"],Gloves:["Arcanist Gloves","Chain Gloves","Conjurer Gloves","Crusader Gloves","Deerskin Gloves","Eelskin Gloves","Embroidered Gloves","Fingerless Silk Gloves","Goathide Gloves","Gripped Gloves","Legion Gloves","Mesh Gloves","Nubuck Gloves","Rawhide Gloves","Ringmail Gloves","Riveted Gloves","Samite Gloves","Satin Gloves","Shagreen Gloves","Sharkskin Gloves","Silk Gloves","Slink Gloves","Soldier Gloves","Sorcerer Gloves","Spiked Gloves","Stealth Gloves","Velvet Gloves","Wool Gloves","Zealot Gloves"],Slippers:["Arcanist Slippers","Avian Slippers","Samite Slippers","Satin Slippers","Silk Slippers","Velvet Slippers"],Plate:["Arena Plate","Astral Plate","Battle Plate","Bronze Plate","Colosseum Plate","Copper Plate","Crusader Plate","Full Plate","Gladiator Plate","Glorious Plate","Golden Plate","Kaom's Plate","Lordly Plate","Majestic Plate","Sun Plate","War Plate"],Talisman:["Ashscale Talisman","Avian Twins Talisman","Black Maw Talisman","Bonespire Talisman","Breakrib Talisman","Chrysalis Talisman","Clutching Talisman","Deadhand Talisman","Deep One Talisman","Fangjaw Talisman","Greatwolf Talisman","Hexclaw Talisman","Horned Talisman","Lone Antler Talisman","Longtooth Talisman","Mandible Talisman","Monkey Paw Talisman","Monkey Twins Talisman","Primal Skull Talisman","Rot Head Talisman","Rotfeather Talisman","Spinefuse Talisman","Splitnewt Talisman","Three Hands Talisman","Three Rat Talisman","Undying Flesh Talisman","Wereclaw Talisman","Writhing Talisman"],Bow:["Assassin Bow","Bone Bow","Citadel Bow","Composite Bow","Compound Bow","Crude Bow","Death Bow","Decimation Bow","Decurve Bow","Grove Bow","Harbinger Bow","Highborn Bow","Imperial Bow","Ivory Bow","Long Bow","Maraketh Bow","Ranger Bow","Recurve Bow","Reflex Bow","Royal Bow","Short Bow","Sniper Bow","Spine Bow","Steelwood Bow","Thicket Bow"],Garb:["Assassin's Garb","Cutthroat's Garb","Lacquered Garb","Sacrificial Garb","Sadist Garb","Silken Garb","Thief's Garb","Waxed Garb"],Mace:["Auric Mace","Behemoth Mace","Bladed Mace","Ceremonial Mace","Dragon Mace","Dream Mace","Flanged Mace","Nightmare Mace","Ornate Mace","Phantom Mace","Wyrm Mace"],Helmet:["Aventail Helmet","Barbute Helmet","Bone Helmet","Close Helmet","Cone Helmet","Crusader Helmet","Gladiator Helmet","Great Helmet","Lacquered Helmet","Reaver Helmet","Samite Helmet","Siege Helmet","Soldier Helmet","Zealot Helmet"],Awl:["Awl"],Baselard:["Baselard"],Foil:["Battered Foil","Burnished Foil","Elegant Foil","Fancy Foil","Jagged Foil","Jewelled Foil","Serrated Foil","Spiraled Foil","Tempered Foil"],Helm:["Battered Helm","Fencer Helm","Secutor Helm"],Buckler:["Battle Buckler","Corrugated Buckler","Crusader Buckler","Enameled Buckler","Gilded Buckler","Goathide Buckler","Golden Buckler","Hammered Buckler","Imperial Buckler","Ironwood Buckler","Lacquered Buckler","Oak Buckler","Painted Buckler","Pine Buckler","Vaal Buckler","War Buckler"],Hammer:["Battle Hammer","Legion Hammer","Stone Hammer","War Hammer"],Lamellar:["Battle Lamellar","Field Lamellar","Triumphant Lamellar"],Blinder:["Blinder"],Raiment:["Blood Raiment","Crimson Raiment","Scarlet Raiment"],Quiver:["Blunt Arrow Quiver","Broadhead Arrow Quiver","Conductive Quiver","Cured Quiver","Fire Arrow Quiver","Heavy Quiver","Light Quiver","Penetrating Arrow Quiver","Rugged Quiver","Serrated Arrow Quiver","Sharktooth Arrow Quiver","Spike-Point Arrow Quiver","Two-Point Arrow Quiver"],Armour:["Bone Armour","Carnal Armour","Crypt Armour","Full Scale Armour"],Circlet:["Bone Circlet","Hubris Circlet","Iron Circlet","Lunaris Circlet","Necromancer Circlet","Solaris Circlet","Steel Circlet","Tribal Circlet","Vine Circlet"],Blade:["Boot Blade","Corroded Blade","Curved Blade","Dusk Blade","Exquisite Blade","Ezomyte Blade","Highland Blade","Lithe Blade","Midnight Blade","Twilight Blade","Vaal Blade","Variscite Blade"],Knife:["Boot Knife","Butcher Knife","Carving Knife","Flaying Knife","Gutting Knife","Skinning Knife","Slaughter Knife"],Maul:["Brass Maul","Coronal Maul","Dread Maul","Driftwood Maul","Fright Maul","Imperial Maul","Jagged Maul","Karui Maul","Plated Maul","Solar Maul","Spiny Maul","Terror Maul","Totemic Maul","Tribal Maul"],Tunic:["Buckskin Tunic","Chainmail Tunic","Eelskin Tunic","Sharkskin Tunic"],Regalia:["Cabalist Regalia","Destroyer Regalia","Vaal Regalia"],Mask:["Callous Mask","Deicide Mask","Festival Mask","Golden Mask","Harlequin Mask","Iron Mask","Plague Mask","Raven Mask","Regicide Mask","Scare Mask","Vaal Mask"],Wand:["Carved Wand","Crystal Wand","Driftwood Wand","Engraved Wand","Heathen Wand","Imbued Wand","Omen Wand","Opal Wand","Pagan Wand","Profane Wand","Prophecy Wand","Quartz Wand","Sage Wand","Serpent Wand","Spiraled Wand","Tornado Wand"],Paw:["Cat's Paw","Hellion's Paw","Tiger's Paw"],Belt:["Chain Belt","Cloth Belt","Crystal Belt","Heavy Belt","Leather Belt","Studded Belt","Vanguard Belt"],Hauberk:["Chain Hauberk","Saint's Hauberk"],Doublet:["Chainmail Doublet","Dragonscale Doublet","Scale Doublet","Wyrmscale Doublet"],Vest:["Chainmail Vest","Oiled Vest","Padded Vest","Plate Vest","Scale Vest","Silken Vest"],Splitter:["Chest Splitter"],Chestplate:["Chestplate"],Cleaver:["Cleaver"],Jewel:["Cobalt Jewel","Crimson Jewel","Ghastly Eye Jewel","Hypnotic Eye Jewel","Murderous Eye Jewel","Prismatic Jewel","Searching Eye Jewel","Viridian Jewel"],Staff:["Coiled Staff","Crescent Staff","Eclipse Staff","Ezomyte Staff","Foul Staff","Highborn Staff","Imperial Staff","Iron Staff","Judgement Staff","Long Staff","Maelström Staff","Military Staff","Moon Staff","Primitive Staff","Primordial Staff","Royal Staff","Serpentine Staff","Vile Staff","Woodful Staff"],Mallet:["Colossus Mallet","Great Mallet","Mallet"],Brigandine:["Commander's Brigandine","Desert Brigandine","General's Brigandine","Hussar Brigandine","Infantry Brigandine","Light Brigandine","Soldier's Brigandine"],Vestment:["Conjurer's Vestment","Mage's Vestment","Occultist's Vestment"],Chainmail:["Conquest Chainmail","Crusader Chainmail","Devout Chainmail","Full Chainmail","Holy Chainmail","Saintly Chainmail"],Kris:["Copper Kris","Golden Kris","Platinum Kris"],Leather:["Coronal Leather","Destiny Leather","Exquisite Leather","Frontier Leather","Full Leather","Glorious Leather","Strapped Leather","Sun Leather","Wild Leather","Zodiac Leather"],Cutlass:["Cutlass"],Dagger:["Demon Dagger","Ezomyte Dagger","Fiend Dagger","Imp Dagger","Prong Dagger"],Horn:["Demon's Horn","Faun's Horn","Goat's Horn"],Claw:["Double Claw","Eagle Claw","Fright Claw","Gemini Claw","Great White Claw","Imperial Claw","Noble Claw","Prehistoric Claw","Sharktooth Claw","Sparkling Claw","Terror Claw","Thresher Claw","Timeworn Claw","Twin Claw","Vaal Claw"],Ringmail:["Elegant Ringmail","Full Ringmail","Latticed Ringmail","Loricated Ringmail","Ornate Ringmail"],Greatsword:["Engraved Greatsword","Etched Greatsword","Vaal Greatsword"],Hatchet:["Engraved Hatchet","Etched Hatchet","Jade Hatchet","Runic Hatchet","Rusted Hatchet","Vaal Hatchet"],Estoc:["Estoc"],Burgonet:["Eternal Burgonet","Ezomyte Burgonet","Royal Burgonet"],Gouger:["Eye Gouger","Gouger"],Rod:["Fishing Rod"],Fleshripper:["Fleshripper"],Bascinet:["Fluted Bascinet","Nightmare Bascinet","Pig-Faced Bascinet"],Dragonscale:["Full Dragonscale"],Wyrmscale:["Full Wyrmscale"],Gavel:["Gavel"],Sallet:["Gilded Sallet","Sallet","Visored Sallet"],Gladius:["Gladius"],Shank:["Glass Shank"],Branch:["Gnarled Branch"],Bracers:["Golden Bracers"],Caligae:["Golden Caligae"],Flame:["Golden Flame"],Hoop:["Golden Hoop"],Mantle:["Golden Mantle"],Obi:["Golden Obi"],Wreath:["Golden Wreath"],Grappler:["Grappler"],Crown:["Great Crown","Magistrate Crown","Praetor Crown","Prophet Crown"],Fetish:["Grinning Fetish"],Ripper:["Gut Ripper"],Hood:["Hunter Hood","Leather Hood","Silken Hood"],Skean:["Imperial Skean","Royal Skean","Skean"],Hat:["Iron Hat"],Chopper:["Jade Chopper","Jasper Chopper","Karui Chopper","Wrist Chopper"],Keyblade:["Keyblade"],Labrys:["Labrys"],Lathi:["Lathi"],Cap:["Leather Cap"],Pelt:["Lion Pelt","Ursine Pelt","Wolf Pelt"],Longsword:["Longsword"],Meatgrinder:["Meatgrinder"],Cage:["Mind Cage","Torture Cage"],Star:["Morning Star"],Fist:["Nailed Fist"],Silks:["Necromancer Silks"],Tricorne:["Noble Tricorne","Sinner Tricorne","Tricorne"],Coat:["Oiled Coat","Ringmail Coat","Sleek Coat","Varnished Coat"],Jacket:["Padded Jacket","Quilted Jacket","Sentinel Jacket"],Pecoraro:["Pecoraro"],Pernarch:["Pernarch"],Piledriver:["Piledriver"],Poignard:["Poignard"],Poleaxe:["Poleaxe"],Quarterstaff:["Quarterstaff"],Breaker:["Rock Breaker"],Coif:["Rusted Coif"],Spike:["Rusted Spike"],Sash:["Rustic Sash"],Sabre:["Sabre"],Robe:["Sage's Robe","Savant's Robe","Scholar's Robe","Silk Robe","Simple Robe","Spidersilk Robe","Widowsilk Robe"],Sai:["Sai"],Sekhem:["Sekhem","Tyrant's Sekhem"],Jerkin:["Shabby Jerkin"],Wrap:["Silken Wrap"],Sledgehammer:["Sledgehammer"],Smallsword:["Smallsword"],Bundle:["Spiked Bundle"],Steelhead:["Steelhead"],Stiletto:["Stiletto"],Vise:["Stygian Vise"],Tenderizer:["Tenderizer"],Stabber:["Throat Stabber"],Hook:["Tiger Hook"],Tomahawk:["Tomahawk"],Trisula:["Trisula"],Woodsplitter:["Woodsplitter"],Shoes:["Wool Shoes"]},FIXED_CURRENCY_VALUES=JSON.parse('{"lines":[{"currencyTypeName":"Mirror of Kalandra","pay":{"id":0,"league_id":1,"pay_currency_id":22,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":0.0000300679,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":22,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":21,"value":34056,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0,0,0,0,-0.23],"totalChange":-0.23},"receiveSparkLine":{"data":[0,0.28,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"chaosEquivalent":33657.03,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,-0.23],"totalChange":-0.23},"lowConfidenceReceiveSparkLine":{"data":[0,0.28,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"detailsId":"mirror-of-kalandra"},{"currencyTypeName":"Eternal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":27,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.0000479443816,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":27,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":9,"value":20480.064,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-0.06,-1.41,-6.03,-7.56,-4.16,-8.1],"totalChange":-8.1},"chaosEquivalent":20668.78,"lowConfidencePaySparkLine":{"data":[0,0,20,20,20,-14.29,25.15],"totalChange":25.15},"lowConfidenceReceiveSparkLine":{"data":[0,-0.06,-1.41,-6.03,-7.56,-4.16,-8.1],"totalChange":-8.1},"detailsId":"eternal-orb"},{"currencyTypeName":"Mirror Shard","pay":{"id":0,"league_id":1,"pay_currency_id":81,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":0.00083,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":81,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":1729.2,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[null,null,null,0,null,null,null],"totalChange":0},"receiveSparkLine":{"data":[],"totalChange":0},"chaosEquivalent":1467.01,"lowConfidencePaySparkLine":{"data":[0,14.29,12.5,10.77,-13.25,-13.25,-13.25],"totalChange":-13.25},"lowConfidenceReceiveSparkLine":{"data":[0,0.29,0,0.76,0.76,-5.71,-5.71],"totalChange":-5.71},"detailsId":"mirror-shard"},{"currencyTypeName":"Blessing of Chayula","pay":{"id":0,"league_id":1,"pay_currency_id":65,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.00435,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":65,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":267.4375,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,3.11,5,2.59,0.7,0.93,2.08],"totalChange":2.08},"chaosEquivalent":248.66,"lowConfidencePaySparkLine":{"data":[0,-1.52,-1.52,-3.47,-6.92,-10.34,-10.34],"totalChange":-10.34},"lowConfidenceReceiveSparkLine":{"data":[0,3.11,5,2.59,0.7,0.93,2.08],"totalChange":2.08},"detailsId":"blessing-of-chayula"},{"currencyTypeName":"Exalted Orb","pay":{"id":0,"league_id":1,"pay_currency_id":2,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":0.00769,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":2,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":80,"value":132,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.65,0.78,0.78,0.78,0.78,0.78],"totalChange":0.78},"receiveSparkLine":{"data":[0,0.27,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"chaosEquivalent":131.02,"lowConfidencePaySparkLine":{"data":[0,0.65,0.78,0.78,0.78,0.78,0.78],"totalChange":0.78},"lowConfidenceReceiveSparkLine":{"data":[0,0.27,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"detailsId":"exalted-orb"},{"currencyTypeName":"Divine Orb","pay":{"id":0,"league_id":1,"pay_currency_id":3,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.03965841379310345,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":3,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":56,"value":26,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,1.21,2.33,0.7,4.18,4.18,5.07],"totalChange":5.07},"receiveSparkLine":{"data":[0,3.85,0.09,0.4,1.85,0,0],"totalChange":0},"chaosEquivalent":25.61,"lowConfidencePaySparkLine":{"data":[0,1.21,2.33,0.7,4.18,4.18,5.07],"totalChange":5.07},"lowConfidenceReceiveSparkLine":{"data":[0,3.85,0.09,0.4,1.85,0,0],"totalChange":0},"detailsId":"divine-orb"},{"currencyTypeName":"Harbinger\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":76,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":0.04860216494845361,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":76,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":24.439393939393938,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-0.18,0.4,0.88,1.97,6.26,3.33],"totalChange":3.33},"receiveSparkLine":{"data":[0,0,0,0,0,0,-2.24],"totalChange":-2.24},"chaosEquivalent":22.51,"lowConfidencePaySparkLine":{"data":[0,-0.18,0.4,0.88,1.97,6.26,3.33],"totalChange":3.33},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,-2.24],"totalChange":-2.24},"detailsId":"harbingers-orb"},{"currencyTypeName":"Ancient Orb","pay":{"id":0,"league_id":1,"pay_currency_id":78,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":7,"value":0.05,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":78,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":48,"value":22,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,5.26,5.26,5.26,5.26,5.26,5.26],"totalChange":5.26},"receiveSparkLine":{"data":[0,-0.38,4.82,3.56,0.27,0.27,0.27],"totalChange":0.27},"chaosEquivalent":21,"lowConfidencePaySparkLine":{"data":[0,5.26,5.26,5.26,5.26,5.26,5.26],"totalChange":5.26},"lowConfidenceReceiveSparkLine":{"data":[0,-0.38,4.82,3.56,0.27,0.27,0.27],"totalChange":0.27},"detailsId":"ancient-orb"},{"currencyTypeName":"Orb of Annulment","pay":{"id":0,"league_id":1,"pay_currency_id":73,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":20,"value":0.06667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":73,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":44,"value":18.8588,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,1.8,7.28,3.94,4.94,14.29,7.14],"totalChange":7.14},"receiveSparkLine":{"data":[0,3.62,15.44,15.81,15.24,15.81,14.95],"totalChange":14.95},"chaosEquivalent":16.93,"lowConfidencePaySparkLine":{"data":[0,1.8,7.28,3.94,4.94,14.29,7.14],"totalChange":7.14},"lowConfidenceReceiveSparkLine":{"data":[0,3.62,15.44,15.81,15.24,15.81,14.95],"totalChange":14.95},"detailsId":"orb-of-annulment"},{"currencyTypeName":"Blessing of Uul-Netol","pay":{"id":0,"league_id":1,"pay_currency_id":64,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.16667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":64,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":9,"value":9.350515463917526,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-30.77,-34,-15.58,-29.53,-24.46,-28.07],"totalChange":-28.07},"chaosEquivalent":7.68,"lowConfidencePaySparkLine":{"data":[null,null,0,33.33,66.66,66.66,99.99],"totalChange":99.99},"lowConfidenceReceiveSparkLine":{"data":[0,-30.77,-34,-15.58,-29.53,-24.46,-28.07],"totalChange":-28.07},"detailsId":"blessing-of-uul-netol"},{"currencyTypeName":"Exalted Shard","pay":{"id":0,"league_id":1,"pay_currency_id":80,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":6,"value":0.16667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":80,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":11,"value":7,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0,null,null,0,0,0],"totalChange":0},"receiveSparkLine":{"data":[0,-11.74,-11.79,2.91,2.91,2.91,2.91],"totalChange":2.91},"chaosEquivalent":6.5,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,-11.74,-11.79,2.91,2.91,2.91,2.91],"totalChange":2.91},"detailsId":"exalted-shard"},{"currencyTypeName":"Master Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":48,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":20,"value":0.24879285714285715,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":48,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":64,"value":4.911668875,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,3.39,3.39,3.39,3.39,3.39,3.89],"totalChange":3.89},"receiveSparkLine":{"data":[0,0,0,18.72,22.5,15.17,22.79],"totalChange":22.79},"chaosEquivalent":4.47,"lowConfidencePaySparkLine":{"data":[0,3.39,3.39,3.39,3.39,3.39,3.89],"totalChange":3.89},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,18.72,22.5,15.17,22.79],"totalChange":22.79},"detailsId":"master-cartographers-sextant"},{"currencyTypeName":"Blessing of Esh","pay":{"id":0,"league_id":1,"pay_currency_id":63,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":63,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":23,"value":4,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":3,"lowConfidencePaySparkLine":{"data":[null,null,0,100,100,100,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"blessing-of-esh"},{"currencyTypeName":"Journeyman Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":47,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":17,"value":0.4230887878787879,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":47,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":2.918542857142857,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0.13,0.05,0.37,0.41,1.71,2.08],"totalChange":2.08},"receiveSparkLine":{"data":[0,-2.76,-16.27,-10.35,0.42,3.99,4.66],"totalChange":4.66},"chaosEquivalent":2.64,"lowConfidencePaySparkLine":{"data":[0,0.13,0.05,0.37,0.41,1.71,2.08],"totalChange":2.08},"lowConfidenceReceiveSparkLine":{"data":[0,-2.76,-16.27,-10.35,0.42,3.99,4.66],"totalChange":4.66},"detailsId":"journeyman-cartographers-sextant"},{"currencyTypeName":"Blessing of Xoph","pay":{"id":0,"league_id":1,"pay_currency_id":61,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":61,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":24,"value":2.483673469387755,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-33.33,-33.33,-33.33,-33.33,-9.93,-17.21],"totalChange":-17.21},"chaosEquivalent":2.24,"lowConfidencePaySparkLine":{"data":[null,null,0,100,100,100,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,-33.33,-33.33,-33.33,-33.33,-9.93,-17.21],"totalChange":-17.21},"detailsId":"blessing-of-xoph"},{"currencyTypeName":"Annulment Shard","pay":{"id":0,"league_id":1,"pay_currency_id":79,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":1.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":79,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":3.8,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[],"totalChange":0},"chaosEquivalent":2.23,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0,-9.09,-9.09,1718.18,1718.18,245.45],"totalChange":245.45},"detailsId":"annulment-shard"},{"currencyTypeName":"Blessing of Tul","pay":{"id":0,"league_id":1,"pay_currency_id":62,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":62,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":15,"value":2,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,22.91,0,0,0],"totalChange":0},"chaosEquivalent":2,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,22.91,0,0,0],"totalChange":0},"detailsId":"blessing-of-tul"},{"currencyTypeName":"Vaal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":8,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":40,"value":0.5834604444444444,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":8,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":81,"value":1.7833907142857144,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,3.03,3.03,3.03,3.03,3.03,3.87],"totalChange":3.87},"receiveSparkLine":{"data":[0,4.08,2.53,1.19,4.08,4.08,3.12],"totalChange":3.12},"chaosEquivalent":1.75,"lowConfidencePaySparkLine":{"data":[0,3.03,3.03,3.03,3.03,3.03,3.87],"totalChange":3.87},"lowConfidenceReceiveSparkLine":{"data":[0,4.08,2.53,1.19,4.08,4.08,3.12],"totalChange":3.12},"detailsId":"vaal-orb"},{"currencyTypeName":"Orb of Horizons","pay":{"id":0,"league_id":1,"pay_currency_id":75,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.958204,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":75,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":31,"value":1.79100045,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-6.68,5.03,-3.73,-4.13,-2.13,-4.61],"totalChange":-4.61},"chaosEquivalent":1.42,"lowConfidencePaySparkLine":{"data":[0,-0.33,0.72,4.29,0.72,-3.63,4.36],"totalChange":4.36},"lowConfidenceReceiveSparkLine":{"data":[0,-6.68,5.03,-3.73,-4.13,-2.13,-4.61],"totalChange":-4.61},"detailsId":"orb-of-horizons"},{"currencyTypeName":"Splinter of Chayula","pay":{"id":0,"league_id":1,"pay_currency_id":60,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":3,"value":0.83333,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":60,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":46,"value":1.5,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,5.26,-9.67,0.7,-21.05,-21.05,-21.05],"totalChange":-21.05},"chaosEquivalent":1.35,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,5.26,-9.67,0.7,-21.05,-21.05,-21.05],"totalChange":-21.05},"detailsId":"splinter-of-chayula"},{"currencyTypeName":"Gemcutter\'s Prism","pay":{"id":0,"league_id":1,"pay_currency_id":15,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":14,"value":0.7885894949494949,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":15,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":74,"value":1.3104130434782608,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,-0.9,-0.9,-1.01,4.44,-0.9,4.73],"totalChange":4.73},"receiveSparkLine":{"data":[0,4.2,4.37,1.67,5.04,1.93,1.19],"totalChange":1.19},"chaosEquivalent":1.29,"lowConfidencePaySparkLine":{"data":[0,-0.9,-0.9,-1.01,4.44,-0.9,4.73],"totalChange":4.73},"lowConfidenceReceiveSparkLine":{"data":[0,4.2,4.37,1.67,5.04,1.93,1.19],"totalChange":1.19},"detailsId":"gemcutters-prism"},{"currencyTypeName":"Apprentice Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":46,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":14,"value":0.9750981212121212,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":46,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":52,"value":1,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-5.02,-6.61,-3.17,-2.11,-3.38,-4.22],"totalChange":-4.22},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":1.01,"lowConfidencePaySparkLine":{"data":[0,-5.02,-6.61,-3.17,-2.11,-3.38,-4.22],"totalChange":-4.22},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"apprentice-cartographers-sextant"},{"currencyTypeName":"Orb of Regret","pay":{"id":0,"league_id":1,"pay_currency_id":9,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":18,"value":1.0964574468085106,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":9,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":92,"value":1.0004330666666668,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0.84,0.94,0.31,0.11,0.32],"totalChange":0.32},"receiveSparkLine":{"data":[0,0,0,0,1.51,0,0.04],"totalChange":0.04},"chaosEquivalent":0.96,"lowConfidencePaySparkLine":{"data":[0,0,0.84,0.94,0.31,0.11,0.32],"totalChange":0.32},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,1.51,0,0.04],"totalChange":0.04},"detailsId":"orb-of-regret"},{"currencyTypeName":"Regal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":7,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":10,"value":1.3920958247422681,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":7,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":73,"value":0.8269064536082474,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0.04,0,0,0,0.12,0.57],"totalChange":0.57},"receiveSparkLine":{"data":[0,-0.09,-2.23,0.79,-1.6,1.46,0.7],"totalChange":0.7},"chaosEquivalent":0.77,"lowConfidencePaySparkLine":{"data":[0,0.04,0,0,0,0.12,0.57],"totalChange":0.57},"lowConfidenceReceiveSparkLine":{"data":[0,-0.09,-2.23,0.79,-1.6,1.46,0.7],"totalChange":0.7},"detailsId":"regal-orb"},{"currencyTypeName":"Engineer\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":77,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":3,"value":2.605612244897959,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":77,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":17,"value":0.8584277931034483,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,18.02,26.46,12.78,12.41,12.81,11.17],"totalChange":11.17},"chaosEquivalent":0.62,"lowConfidencePaySparkLine":{"data":[0,2,11.98,11.98,30.74,30.74,30.49],"totalChange":30.49},"lowConfidenceReceiveSparkLine":{"data":[0,18.02,26.46,12.78,12.41,12.81,11.17],"totalChange":11.17},"detailsId":"engineers-orb"},{"currencyTypeName":"Orb of Fusing","pay":{"id":0,"league_id":1,"pay_currency_id":5,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":1.95,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":5,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":0.55044,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0.78,0.62,0.54,2.53,2.56],"totalChange":2.56},"receiveSparkLine":{"data":[0,-0.93,-2.39,-0.55,-1.99,-1,-0.92],"totalChange":-0.92},"chaosEquivalent":0.53,"lowConfidencePaySparkLine":{"data":[0,0,0.78,0.62,0.54,2.53,2.56],"totalChange":2.56},"lowConfidenceReceiveSparkLine":{"data":[0,-0.93,-2.39,-0.55,-1.99,-1,-0.92],"totalChange":-0.92},"detailsId":"orb-of-fusing"},{"currencyTypeName":"Orb of Scouring","pay":{"id":0,"league_id":1,"pay_currency_id":14,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":2.1,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":14,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":91,"value":0.5354012105263158,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,4.55,4.55,4.55,5.09,8.71,9.52],"totalChange":9.52},"receiveSparkLine":{"data":[0,0,0,0,0,-0.56,7.08],"totalChange":7.08},"chaosEquivalent":0.51,"lowConfidencePaySparkLine":{"data":[0,4.55,4.55,4.55,5.09,8.71,9.52],"totalChange":9.52},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,-0.56,7.08],"totalChange":7.08},"detailsId":"orb-of-scouring"},{"currencyTypeName":"Cartographer\'s Chisel","pay":{"id":0,"league_id":1,"pay_currency_id":10,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":2.4,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":10,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":58,"value":0.46549529545454543,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-3.14,-3.14,0.9,0.9,0.9,0.9],"totalChange":0.9},"receiveSparkLine":{"data":[0,0.97,-2.18,1.69,-2.38,-1.15,-0.13],"totalChange":-0.13},"chaosEquivalent":0.44,"lowConfidencePaySparkLine":{"data":[0,-3.14,-3.14,0.9,0.9,0.9,0.9],"totalChange":0.9},"lowConfidenceReceiveSparkLine":{"data":[0,0.97,-2.18,1.69,-2.38,-1.15,-0.13],"totalChange":-0.13},"detailsId":"cartographers-chisel"},{"currencyTypeName":"Orb of Alchemy","pay":{"id":0,"league_id":1,"pay_currency_id":4,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":2.841666666666667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":4,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":65,"value":0.35714,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-0.63,0.07,6.42,6.41,2.75,4.86],"totalChange":4.86},"receiveSparkLine":{"data":[0,2.66,-5.08,-7.82,-6.04,-6.22,-14.4],"totalChange":-14.4},"chaosEquivalent":0.35,"lowConfidencePaySparkLine":{"data":[0,-0.63,0.07,6.42,6.41,2.75,4.86],"totalChange":4.86},"lowConfidenceReceiveSparkLine":{"data":[0,2.66,-5.08,-7.82,-6.04,-6.22,-14.4],"totalChange":-14.4},"detailsId":"orb-of-alchemy"},{"currencyTypeName":"Silver Coin","pay":{"id":0,"league_id":1,"pay_currency_id":12,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":15,"value":3.6,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":12,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.3146063292682927,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,5.33,2.76,0.91,2.92,3.72,3.72],"totalChange":3.72},"receiveSparkLine":{"data":[0,-8.82,-8.94,-8.94,-8.94,2.68,0.27],"totalChange":0.27},"chaosEquivalent":0.3,"lowConfidencePaySparkLine":{"data":[0,5.33,2.76,0.91,2.92,3.72,3.72],"totalChange":3.72},"lowConfidenceReceiveSparkLine":{"data":[0,-8.82,-8.94,-8.94,-8.94,2.68,0.27],"totalChange":0.27},"detailsId":"silver-coin"},{"currencyTypeName":"Blessed Orb","pay":{"id":0,"league_id":1,"pay_currency_id":18,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":10,"value":3.7901630434782607,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":18,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":53,"value":0.32171585542168674,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.1,0.06,0.06,0.7,0.23,0.25],"totalChange":0.25},"receiveSparkLine":{"data":[0,0,-1.04,-1.47,-1.55,0,-3.48],"totalChange":-3.48},"chaosEquivalent":0.29,"lowConfidencePaySparkLine":{"data":[0,0.1,0.06,0.06,0.7,0.23,0.25],"totalChange":0.25},"lowConfidenceReceiveSparkLine":{"data":[0,0,-1.04,-1.47,-1.55,0,-3.48],"totalChange":-3.48},"detailsId":"blessed-orb"},{"currencyTypeName":"Chromatic Orb","pay":{"id":0,"league_id":1,"pay_currency_id":17,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":30,"value":3.900757575757576,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":17,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":91,"value":0.27702283333333333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-1.17,-1.9,-0.9,-0.75,0.03,0.01],"totalChange":0.01},"receiveSparkLine":{"data":[0,-1.38,-1.35,-2.08,-2.08,-2.08,-2.35],"totalChange":-2.35},"chaosEquivalent":0.27,"lowConfidencePaySparkLine":{"data":[0,-1.17,-1.9,-0.9,-0.75,0.03,0.01],"totalChange":0.01},"lowConfidenceReceiveSparkLine":{"data":[0,-1.38,-1.35,-2.08,-2.08,-2.08,-2.35],"totalChange":-2.35},"detailsId":"chromatic-orb"},{"currencyTypeName":"Orb of Binding","pay":{"id":0,"league_id":1,"pay_currency_id":74,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":6,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":74,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":28,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":0.25,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"orb-of-binding"},{"currencyTypeName":"Splinter of Xoph","pay":{"id":0,"league_id":1,"pay_currency_id":56,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":8,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":56,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":29,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-5.08,-14.97,8.86,-18.21,-14.21,-20.82],"totalChange":-20.82},"chaosEquivalent":0.23,"lowConfidencePaySparkLine":{"data":[null,null,0,14.29,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,-5.08,-14.97,8.86,-18.21,-14.21,-20.82],"totalChange":-20.82},"detailsId":"splinter-of-xoph"},{"currencyTypeName":"Splinter of Uul-Netol","pay":{"id":0,"league_id":1,"pay_currency_id":59,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":15,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":59,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,1.07,1.07,1.07,1.07,1.07,1.07],"totalChange":1.07},"chaosEquivalent":0.2,"lowConfidencePaySparkLine":{"data":[null,null,0,50,50,50,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,1.07,1.07,1.07,1.07,1.07,1.07],"totalChange":1.07},"detailsId":"splinter-of-uul-netol"},{"currencyTypeName":"Orb of Alteration","pay":{"id":0,"league_id":1,"pay_currency_id":6,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":32,"value":6.897234042553191,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":6,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":61,"value":0.14286,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,3.09,4.16,5.69,9.14,5.69,4.2],"totalChange":4.2},"receiveSparkLine":{"data":[0,-0.03,-0.5,-0.41,-0.73,0,0],"totalChange":0},"chaosEquivalent":0.14,"lowConfidencePaySparkLine":{"data":[0,3.09,4.16,5.69,9.14,5.69,4.2],"totalChange":4.2},"lowConfidenceReceiveSparkLine":{"data":[0,-0.03,-0.5,-0.41,-0.73,0,0],"totalChange":0},"detailsId":"orb-of-alteration"},{"currencyTypeName":"Jeweller\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":11,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":24,"value":7.8,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":11,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":75,"value":0.13261883720930231,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.3,1.86,3.61,3.33,4.92,6.27],"totalChange":6.27},"receiveSparkLine":{"data":[0,-1.86,1.35,-2.11,-3.08,-1.86,-2.39],"totalChange":-2.39},"chaosEquivalent":0.13,"lowConfidencePaySparkLine":{"data":[0,0.3,1.86,3.61,3.33,4.92,6.27],"totalChange":6.27},"lowConfidenceReceiveSparkLine":{"data":[0,-1.86,1.35,-2.11,-3.08,-1.86,-2.39],"totalChange":-2.39},"detailsId":"jewellers-orb"},{"currencyTypeName":"Orb of Chance","pay":{"id":0,"league_id":1,"pay_currency_id":16,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":7,"value":8.64997340425532,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":16,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":76,"value":0.11111,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-3.04,0.02,0.72,-0.25,-0.36,7.21],"totalChange":7.21},"receiveSparkLine":{"data":[0,0,1.83,0,-2.24,0,-5.56],"totalChange":-5.56},"chaosEquivalent":0.11,"lowConfidencePaySparkLine":{"data":[0,-3.04,0.02,0.72,-0.25,-0.36,7.21],"totalChange":7.21},"lowConfidenceReceiveSparkLine":{"data":[0,0,1.83,0,-2.24,0,-5.56],"totalChange":-5.56},"detailsId":"orb-of-chance"},{"currencyTypeName":"Glassblower\'s Bauble","pay":{"id":0,"league_id":1,"pay_currency_id":19,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":15.31340206185567,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":19,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":51,"value":0.14286,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-0.12,0,1.2,2.08,3.07,3.07],"totalChange":3.07},"chaosEquivalent":0.1,"lowConfidencePaySparkLine":{"data":[0,0,-1.94,3.94,3.9,3.9,9.05],"totalChange":9.05},"lowConfidenceReceiveSparkLine":{"data":[0,-0.12,0,1.2,2.08,3.07,3.07],"totalChange":3.07},"detailsId":"glassblowers-bauble"},{"currencyTypeName":"Splinter of Tul","pay":{"id":0,"league_id":1,"pay_currency_id":57,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":20,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":57,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":23,"value":0.14089376744186047,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,4.1,4.81,5.81,5.86,9.04,18.99],"totalChange":18.99},"chaosEquivalent":0.1,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,4.1,4.81,5.81,5.86,9.04,18.99],"totalChange":18.99},"detailsId":"splinter-of-tul"},{"currencyTypeName":"Splinter of Esh","pay":{"id":0,"league_id":1,"pay_currency_id":58,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":20,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":58,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":29,"value":0.1326773181818182,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0.47,0.74,8.18,8.18,8.18,0.47],"totalChange":0.47},"chaosEquivalent":0.09,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0.47,0.74,8.18,8.18,8.18,0.47],"totalChange":0.47},"detailsId":"splinter-of-esh"},{"currencyTypeName":"Orb of Augmentation","pay":{"id":0,"league_id":1,"pay_currency_id":20,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":5,"value":42.121212121212125,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":20,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.035082486842105264,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[null,null,null,null,null,null,0],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,1.83,5.26],"totalChange":5.26},"chaosEquivalent":0.03,"lowConfidencePaySparkLine":{"data":[0,-45.46,-46.56,-41.35,-39.88,-39.88,-42.9],"totalChange":-42.9},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,1.83,5.26],"totalChange":5.26},"detailsId":"orb-of-augmentation"},{"currencyTypeName":"Blacksmith\'s Whetstone","pay":{"id":0,"league_id":1,"pay_currency_id":25,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":137.4747474747475,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":25,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":38,"value":0.024965935064935066,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,21.31,20.44,18.01,21.49,17.2,20.28],"totalChange":20.28},"receiveSparkLine":{"data":[0,-12.72,-18.33,-18.7,-16.53,-16.53,-16.64],"totalChange":-16.64},"chaosEquivalent":0.02,"lowConfidencePaySparkLine":{"data":[0,21.31,20.44,18.01,21.49,17.2,20.28],"totalChange":20.28},"lowConfidenceReceiveSparkLine":{"data":[0,-12.72,-18.33,-18.7,-16.53,-16.53,-16.64],"totalChange":-16.64},"detailsId":"blacksmiths-whetstone"},{"currencyTypeName":"Perandus Coin","pay":{"id":0,"league_id":1,"pay_currency_id":13,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":200,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":13,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":0.011368279569892474,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,2.35,-7.37,-12.56,-16.67,-10.22,-4.79],"totalChange":-4.79},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0.22,-2.43,-4.97,-4.97,2.72,2.72],"totalChange":2.72},"lowConfidenceReceiveSparkLine":{"data":[0,2.35,-7.37,-12.56,-16.67,-10.22,-4.79],"totalChange":-4.79},"detailsId":"perandus-coin"},{"currencyTypeName":"Orb of Transmutation","pay":{"id":0,"league_id":1,"pay_currency_id":21,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":196.62,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":21,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":53,"value":0.01613,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0,null,21.78,21.78,null,null],"totalChange":21.78},"receiveSparkLine":{"data":[0,0,-0.42,-0.12,-2.46,-5.76,-3.24],"totalChange":-3.24},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0,-1.33,21.78,21.78,22.08,22.06],"totalChange":22.06},"lowConfidenceReceiveSparkLine":{"data":[0,0,-0.42,-0.12,-2.46,-5.76,-3.24],"totalChange":-3.24},"detailsId":"orb-of-transmutation"},{"currencyTypeName":"Portal Scroll","pay":{"id":0,"league_id":1,"pay_currency_id":24,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":364.8484848484849,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":24,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":38,"value":0.014209822916666667,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,-0.12,-4.8,-4.8,-14.76],"totalChange":-14.76},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,-23.5,14.82,46.05,46.05,52.82,76.13],"totalChange":76.13},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,-0.12,-4.8,-4.8,-14.76],"totalChange":-14.76},"detailsId":"portal-scroll"},{"currencyTypeName":"Armourer\'s Scrap","pay":{"id":0,"league_id":1,"pay_currency_id":26,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":6,"value":197.55050505050505,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":26,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":0.02,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[null,null,null,0,0,null,4.57],"totalChange":4.57},"receiveSparkLine":{"data":[0,0.72,1.65,10.01,9.9,10.01,10.01],"totalChange":10.01},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0,1.53,0.71,0.71,1.73,5.31],"totalChange":5.31},"lowConfidenceReceiveSparkLine":{"data":[0,0.72,1.65,10.01,9.9,10.01,10.01],"totalChange":10.01},"detailsId":"armourers-scrap"}],"currencyDetails":[{"id":1,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1","name":"Chaos Orb","poeTradeId":4},{"id":2,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&w=1&h=1","name":"Exalted Orb","poeTradeId":6},{"id":3,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyModValues.png?scale=1&w=1&h=1","name":"Divine Orb","poeTradeId":15},{"id":4,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeToRare.png?scale=1&w=1&h=1","name":"Orb of Alchemy","poeTradeId":3},{"id":5,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketLinks.png?scale=1&w=1&h=1","name":"Orb of Fusing","poeTradeId":2},{"id":6,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollMagic.png?scale=1&w=1&h=1","name":"Orb of Alteration","poeTradeId":1},{"id":7,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeMagicToRare.png?scale=1&w=1&h=1","name":"Regal Orb","poeTradeId":14},{"id":8,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyVaal.png?scale=1&w=1&h=1","name":"Vaal Orb","poeTradeId":16},{"id":9,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyPassiveSkillRefund.png?scale=1&w=1&h=1","name":"Orb of Regret","poeTradeId":13},{"id":10,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyMapQuality.png?scale=1&w=1&h=1","name":"Cartographer\'s Chisel","poeTradeId":10},{"id":11,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketNumbers.png?scale=1&w=1&h=1","name":"Jeweller\'s Orb","poeTradeId":8},{"id":12,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SilverObol.png?scale=1&w=1&h=1","name":"Silver Coin","poeTradeId":35},{"id":13,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyCoin.png?scale=1&w=1&h=1","name":"Perandus Coin","poeTradeId":26},{"id":14,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyConvertToNormal.png?scale=1&w=1&h=1","name":"Orb of Scouring","poeTradeId":11},{"id":15,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyGemQuality.png?scale=1&w=1&h=1","name":"Gemcutter\'s Prism","poeTradeId":5},{"id":16,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeRandomly.png?scale=1&w=1&h=1","name":"Orb of Chance","poeTradeId":9},{"id":17,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketColours.png?scale=1&w=1&h=1","name":"Chromatic Orb","poeTradeId":7},{"id":18,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyImplicitMod.png?scale=1&w=1&h=1","name":"Blessed Orb","poeTradeId":12},{"id":19,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyFlaskQuality.png?scale=1&w=1&h=1","name":"Glassblower\'s Bauble","poeTradeId":21},{"id":20,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToMagic.png?scale=1&w=1&h=1","name":"Orb of Augmentation","poeTradeId":23},{"id":21,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeToMagic.png?scale=1&w=1&h=1","name":"Orb of Transmutation","poeTradeId":22},{"id":22,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyDuplicate.png?scale=1&w=1&h=1","name":"Mirror of Kalandra","poeTradeId":24},{"id":23,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyIdentification.png?scale=1&w=1&h=1","name":"Scroll of Wisdom","poeTradeId":17},{"id":24,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyPortal.png?scale=1&w=1&h=1","name":"Portal Scroll","poeTradeId":18},{"id":25,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyWeaponQuality.png?scale=1&w=1&h=1","name":"Blacksmith\'s Whetstone","poeTradeId":20},{"id":26,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyArmourQuality.png?scale=1&w=1&h=1","name":"Armourer\'s Scrap","poeTradeId":19},{"id":27,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyImprintOrb.png?scale=1&w=1&h=1","name":"Eternal Orb","poeTradeId":25},{"id":28,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal04.png?scale=1&scaleIndex=0&w=1&h=1","name":"Sacrifice at Dusk","poeTradeId":27},{"id":29,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal01.png?scale=1&w=1&h=1&v=3b21ce0cd4c0b9e8cf5db6257daf831a3","name":"Sacrifice at Midnight","poeTradeId":28},{"id":30,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal02.png?scale=1&w=1&h=1&v=3ead6455599ec6c303f54ba98d6f8eb23","name":"Sacrifice at Dawn","poeTradeId":29},{"id":31,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal03.png?scale=1&w=1&h=1&v=ba374d543316349b87de121039c3cc6f3","name":"Sacrifice at Noon","poeTradeId":30},{"id":32,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal04.png?scale=1&w=1&h=1&v=735839ceae0fc45d15ec69555e9314133","name":"Mortal Grief","poeTradeId":31},{"id":33,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal01.png?scale=1&w=1&h=1&v=9336df5d7d0befd5963b71e7a68479ce3","name":"Mortal Rage","poeTradeId":32},{"id":34,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal03.png?scale=1&w=1&h=1&v=9fb218dad337a4627a59f74bfa2d6c863","name":"Mortal Ignorance","poeTradeId":34},{"id":35,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal02.png?scale=1&w=1&h=1&v=db5b529a8425bd2b9fd7bee9fca2e0183","name":"Mortal Hope","poeTradeId":33},{"id":36,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt01.png?scale=1&w=1&h=1&v=044cbdae1e06e621585eaa627c2162db3","name":"Eber\'s Key","poeTradeId":36},{"id":37,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt02.png?scale=1&w=1&h=1&v=757829336b7239c4b1e398c203f0cca03","name":"Yriel\'s Key","poeTradeId":37},{"id":38,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt03.png?scale=1&w=1&h=1&v=6e43b636847d46b560ef0518869a72943","name":"Inya\'s Key","poeTradeId":38},{"id":39,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt04.png?scale=1&w=1&h=1&v=5c3afc6bad631a50f9fe5ccb570aeb363","name":"Volkuur\'s Key","poeTradeId":39},{"id":40,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentHydra.png?scale=1&w=1&h=1&v=fd37e4be7672c0db8b549a1b16ad489d3","name":"Fragment of the Hydra","poeTradeId":41},{"id":41,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentPhoenix.png?scale=1&w=1&h=1&v=8f76720ab06bb40a6d6f75730f92e4a73","name":"Fragment of the Phoenix","poeTradeId":42},{"id":42,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentMinotaur.png?scale=1&w=1&h=1&v=e0e3f5e7daf32736d63fc3df1ba981223","name":"Fragment of the Minotaur","poeTradeId":43},{"id":43,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentChimera.png?scale=1&w=1&h=1&v=15bd6ba80e1853c22ae3acf40abf64283","name":"Fragment of the Chimera","poeTradeId":44},{"id":44,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Labyrinth.png?scale=1&w=1&h=1&v=ef005aef5d2f9135d6922f4b1b912f783","name":"Offering to the Goddess","poeTradeId":40},{"id":45,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyImprintOrb.png?scale=1&w=1&h=1","name":"Stacked Deck","poeTradeId":-1},{"id":46,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AtlasRadiusWhite.png?scale=1&w=1&h=1","name":"Apprentice Cartographer\'s Sextant","poeTradeId":45},{"id":47,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AtlasRadiusYellow.png?scale=1&w=1&h=1","name":"Journeyman Cartographer\'s Sextant","poeTradeId":46},{"id":48,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AtlasRadiusRed.png?scale=1&w=1&h=1","name":"Master Cartographer\'s Sextant","poeTradeId":47},{"id":49,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealWhite.png?scale=1&w=1&h=1","name":"Apprentice Cartographer\'s Seal","poeTradeId":-1},{"id":50,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealYellow.png?scale=1&w=1&h=1","name":"Journeyman Cartographer\'s Seal","poeTradeId":-1},{"id":51,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Master Cartographer\'s Seal","poeTradeId":-1},{"id":52,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Sacrifice Set","poeTradeId":48},{"id":53,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Mortal Set","poeTradeId":49},{"id":54,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Pale Court Set","poeTradeId":50},{"id":55,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Shaper Set","poeTradeId":51},{"id":56,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Xoph","poeTradeId":52},{"id":57,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Tul","poeTradeId":53},{"id":58,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Esh","poeTradeId":54},{"id":59,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Uul-Netol","poeTradeId":55},{"id":60,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Chayula","poeTradeId":56},{"id":61,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Xoph","poeTradeId":57},{"id":62,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Tul","poeTradeId":58},{"id":63,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Esh","poeTradeId":59},{"id":64,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Uul-Netol","poeTradeId":60},{"id":65,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Chayula","poeTradeId":61},{"id":66,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Xoph\'s Breachstone","poeTradeId":62},{"id":67,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Tul\'s Breachstone","poeTradeId":63},{"id":68,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Esh\'s Breachstone","poeTradeId":64},{"id":69,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Uul-Netol\'s Breachstone","poeTradeId":65},{"id":70,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Chayula\'s Breachstone","poeTradeId":66},{"id":71,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/VaultMap.png?scale=1&scaleIndex=0&w=1&h=1","name":"Ancient Reliquary Key","poeTradeId":494},{"id":72,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/SinFlaskEmpty.png?scale=1&scaleIndex=0&w=1&h=2","name":"Divine Vessel","poeTradeId":512},{"id":73,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AnnullOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Orb of Annulment","poeTradeId":513},{"id":74,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/BindingOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Orb of Binding","poeTradeId":514},{"id":75,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/HorizonOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Orb of Horizons","poeTradeId":515},{"id":76,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/HarbingerOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Harbinger\'s Orb","poeTradeId":516},{"id":77,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/EngineersOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Engineer\'s Orb","poeTradeId":517},{"id":78,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AncientOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Ancient Orb","poeTradeId":518},{"id":79,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AnnullShard.png?scale=1&scaleIndex=0&w=1&h=1","name":"Annulment Shard","poeTradeId":519},{"id":80,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/ExaltedShard.png?scale=1&scaleIndex=0&w=1&h=1","name":"Exalted Shard","poeTradeId":521},{"id":81,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/MirrorShard.png?scale=1&scaleIndex=0&w=1&h=1","name":"Mirror Shard","poeTradeId":520},{"id":82,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/VaultMap3.png?scale=1&scaleIndex=0&w=1&h=1","name":"Timeworn Reliquary Key","poeTradeId":-1},{"id":83,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Xoph\'s Charged Breachstone","poeTradeId":-1},{"id":84,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Tul\'s Charged Breachstone","poeTradeId":-1},{"id":85,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Esh\'s Charged Breachstone","poeTradeId":-1},{"id":86,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Uul-Netol\'s Charged Breachstone","poeTradeId":-1},{"id":87,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Chayula\'s Charged Breachstone","poeTradeId":-1},{"id":88,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Xoph\'s Enriched Breachstone","poeTradeId":-1},{"id":89,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Tul\'s Enriched Breachstone","poeTradeId":-1},{"id":90,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Esh\'s Enriched Breachstone","poeTradeId":-1},{"id":91,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Uul-Netol\'s Enriched Breachstone","poeTradeId":-1},{"id":92,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Chayula\'s Enriched Breachstone","poeTradeId":-1},{"id":93,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Xoph\'s Pure Breachstone","poeTradeId":-1},{"id":94,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Tul\'s Pure Breachstone","poeTradeId":-1},{"id":95,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Esh\'s Pure Breachstone","poeTradeId":-1},{"id":96,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Uul-Netol\'s Pure Breachstone","poeTradeId":-1},{"id":97,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Chayula\'s Pure Breachstone","poeTradeId":-1}],"map":{"Mirror of Kalandra":{"currencyTypeName":"Mirror of Kalandra","pay":{"id":0,"league_id":1,"pay_currency_id":22,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":0.0000300679,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":22,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":21,"value":34056,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0,0,0,0,-0.23],"totalChange":-0.23},"receiveSparkLine":{"data":[0,0.28,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"chaosEquivalent":33657.03,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,-0.23],"totalChange":-0.23},"lowConfidenceReceiveSparkLine":{"data":[0,0.28,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"detailsId":"mirror-of-kalandra"},"Eternal Orb":{"currencyTypeName":"Eternal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":27,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.0000479443816,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":27,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":9,"value":20480.064,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-0.06,-1.41,-6.03,-7.56,-4.16,-8.1],"totalChange":-8.1},"chaosEquivalent":20668.78,"lowConfidencePaySparkLine":{"data":[0,0,20,20,20,-14.29,25.15],"totalChange":25.15},"lowConfidenceReceiveSparkLine":{"data":[0,-0.06,-1.41,-6.03,-7.56,-4.16,-8.1],"totalChange":-8.1},"detailsId":"eternal-orb"},"Mirror Shard":{"currencyTypeName":"Mirror Shard","pay":{"id":0,"league_id":1,"pay_currency_id":81,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":0.00083,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":81,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":1729.2,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[null,null,null,0,null,null,null],"totalChange":0},"receiveSparkLine":{"data":[],"totalChange":0},"chaosEquivalent":1467.01,"lowConfidencePaySparkLine":{"data":[0,14.29,12.5,10.77,-13.25,-13.25,-13.25],"totalChange":-13.25},"lowConfidenceReceiveSparkLine":{"data":[0,0.29,0,0.76,0.76,-5.71,-5.71],"totalChange":-5.71},"detailsId":"mirror-shard"},"Blessing of Chayula":{"currencyTypeName":"Blessing of Chayula","pay":{"id":0,"league_id":1,"pay_currency_id":65,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.00435,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":65,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":267.4375,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,3.11,5,2.59,0.7,0.93,2.08],"totalChange":2.08},"chaosEquivalent":248.66,"lowConfidencePaySparkLine":{"data":[0,-1.52,-1.52,-3.47,-6.92,-10.34,-10.34],"totalChange":-10.34},"lowConfidenceReceiveSparkLine":{"data":[0,3.11,5,2.59,0.7,0.93,2.08],"totalChange":2.08},"detailsId":"blessing-of-chayula"},"Exalted Orb":{"currencyTypeName":"Exalted Orb","pay":{"id":0,"league_id":1,"pay_currency_id":2,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":0.00769,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":2,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":80,"value":132,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.65,0.78,0.78,0.78,0.78,0.78],"totalChange":0.78},"receiveSparkLine":{"data":[0,0.27,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"chaosEquivalent":131.02,"lowConfidencePaySparkLine":{"data":[0,0.65,0.78,0.78,0.78,0.78,0.78],"totalChange":0.78},"lowConfidenceReceiveSparkLine":{"data":[0,0.27,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"detailsId":"exalted-orb"},"Divine Orb":{"currencyTypeName":"Divine Orb","pay":{"id":0,"league_id":1,"pay_currency_id":3,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.03965841379310345,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":3,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":56,"value":26,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,1.21,2.33,0.7,4.18,4.18,5.07],"totalChange":5.07},"receiveSparkLine":{"data":[0,3.85,0.09,0.4,1.85,0,0],"totalChange":0},"chaosEquivalent":25.61,"lowConfidencePaySparkLine":{"data":[0,1.21,2.33,0.7,4.18,4.18,5.07],"totalChange":5.07},"lowConfidenceReceiveSparkLine":{"data":[0,3.85,0.09,0.4,1.85,0,0],"totalChange":0},"detailsId":"divine-orb"},"Harbinger\'s Orb":{"currencyTypeName":"Harbinger\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":76,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":0.04860216494845361,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":76,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":24.439393939393938,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-0.18,0.4,0.88,1.97,6.26,3.33],"totalChange":3.33},"receiveSparkLine":{"data":[0,0,0,0,0,0,-2.24],"totalChange":-2.24},"chaosEquivalent":22.51,"lowConfidencePaySparkLine":{"data":[0,-0.18,0.4,0.88,1.97,6.26,3.33],"totalChange":3.33},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,-2.24],"totalChange":-2.24},"detailsId":"harbingers-orb"},"Ancient Orb":{"currencyTypeName":"Ancient Orb","pay":{"id":0,"league_id":1,"pay_currency_id":78,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":7,"value":0.05,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":78,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":48,"value":22,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,5.26,5.26,5.26,5.26,5.26,5.26],"totalChange":5.26},"receiveSparkLine":{"data":[0,-0.38,4.82,3.56,0.27,0.27,0.27],"totalChange":0.27},"chaosEquivalent":21,"lowConfidencePaySparkLine":{"data":[0,5.26,5.26,5.26,5.26,5.26,5.26],"totalChange":5.26},"lowConfidenceReceiveSparkLine":{"data":[0,-0.38,4.82,3.56,0.27,0.27,0.27],"totalChange":0.27},"detailsId":"ancient-orb"},"Orb of Annulment":{"currencyTypeName":"Orb of Annulment","pay":{"id":0,"league_id":1,"pay_currency_id":73,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":20,"value":0.06667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":73,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":44,"value":18.8588,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,1.8,7.28,3.94,4.94,14.29,7.14],"totalChange":7.14},"receiveSparkLine":{"data":[0,3.62,15.44,15.81,15.24,15.81,14.95],"totalChange":14.95},"chaosEquivalent":16.93,"lowConfidencePaySparkLine":{"data":[0,1.8,7.28,3.94,4.94,14.29,7.14],"totalChange":7.14},"lowConfidenceReceiveSparkLine":{"data":[0,3.62,15.44,15.81,15.24,15.81,14.95],"totalChange":14.95},"detailsId":"orb-of-annulment"},"Blessing of Uul-Netol":{"currencyTypeName":"Blessing of Uul-Netol","pay":{"id":0,"league_id":1,"pay_currency_id":64,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.16667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":64,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":9,"value":9.350515463917526,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-30.77,-34,-15.58,-29.53,-24.46,-28.07],"totalChange":-28.07},"chaosEquivalent":7.68,"lowConfidencePaySparkLine":{"data":[null,null,0,33.33,66.66,66.66,99.99],"totalChange":99.99},"lowConfidenceReceiveSparkLine":{"data":[0,-30.77,-34,-15.58,-29.53,-24.46,-28.07],"totalChange":-28.07},"detailsId":"blessing-of-uul-netol"},"Exalted Shard":{"currencyTypeName":"Exalted Shard","pay":{"id":0,"league_id":1,"pay_currency_id":80,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":6,"value":0.16667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":80,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":11,"value":7,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0,null,null,0,0,0],"totalChange":0},"receiveSparkLine":{"data":[0,-11.74,-11.79,2.91,2.91,2.91,2.91],"totalChange":2.91},"chaosEquivalent":6.5,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,-11.74,-11.79,2.91,2.91,2.91,2.91],"totalChange":2.91},"detailsId":"exalted-shard"},"Master Cartographer\'s Sextant":{"currencyTypeName":"Master Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":48,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":20,"value":0.24879285714285715,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":48,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":64,"value":4.911668875,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,3.39,3.39,3.39,3.39,3.39,3.89],"totalChange":3.89},"receiveSparkLine":{"data":[0,0,0,18.72,22.5,15.17,22.79],"totalChange":22.79},"chaosEquivalent":4.47,"lowConfidencePaySparkLine":{"data":[0,3.39,3.39,3.39,3.39,3.39,3.89],"totalChange":3.89},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,18.72,22.5,15.17,22.79],"totalChange":22.79},"detailsId":"master-cartographers-sextant"},"Blessing of Esh":{"currencyTypeName":"Blessing of Esh","pay":{"id":0,"league_id":1,"pay_currency_id":63,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":63,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":23,"value":4,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":3,"lowConfidencePaySparkLine":{"data":[null,null,0,100,100,100,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"blessing-of-esh"},"Journeyman Cartographer\'s Sextant":{"currencyTypeName":"Journeyman Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":47,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":17,"value":0.4230887878787879,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":47,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":2.918542857142857,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0.13,0.05,0.37,0.41,1.71,2.08],"totalChange":2.08},"receiveSparkLine":{"data":[0,-2.76,-16.27,-10.35,0.42,3.99,4.66],"totalChange":4.66},"chaosEquivalent":2.64,"lowConfidencePaySparkLine":{"data":[0,0.13,0.05,0.37,0.41,1.71,2.08],"totalChange":2.08},"lowConfidenceReceiveSparkLine":{"data":[0,-2.76,-16.27,-10.35,0.42,3.99,4.66],"totalChange":4.66},"detailsId":"journeyman-cartographers-sextant"},"Blessing of Xoph":{"currencyTypeName":"Blessing of Xoph","pay":{"id":0,"league_id":1,"pay_currency_id":61,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":61,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":24,"value":2.483673469387755,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-33.33,-33.33,-33.33,-33.33,-9.93,-17.21],"totalChange":-17.21},"chaosEquivalent":2.24,"lowConfidencePaySparkLine":{"data":[null,null,0,100,100,100,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,-33.33,-33.33,-33.33,-33.33,-9.93,-17.21],"totalChange":-17.21},"detailsId":"blessing-of-xoph"},"Annulment Shard":{"currencyTypeName":"Annulment Shard","pay":{"id":0,"league_id":1,"pay_currency_id":79,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":1.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":79,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":3.8,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[],"totalChange":0},"chaosEquivalent":2.23,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0,-9.09,-9.09,1718.18,1718.18,245.45],"totalChange":245.45},"detailsId":"annulment-shard"},"Blessing of Tul":{"currencyTypeName":"Blessing of Tul","pay":{"id":0,"league_id":1,"pay_currency_id":62,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":62,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":15,"value":2,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,22.91,0,0,0],"totalChange":0},"chaosEquivalent":2,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,22.91,0,0,0],"totalChange":0},"detailsId":"blessing-of-tul"},"Vaal Orb":{"currencyTypeName":"Vaal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":8,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":40,"value":0.5834604444444444,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":8,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":81,"value":1.7833907142857144,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,3.03,3.03,3.03,3.03,3.03,3.87],"totalChange":3.87},"receiveSparkLine":{"data":[0,4.08,2.53,1.19,4.08,4.08,3.12],"totalChange":3.12},"chaosEquivalent":1.75,"lowConfidencePaySparkLine":{"data":[0,3.03,3.03,3.03,3.03,3.03,3.87],"totalChange":3.87},"lowConfidenceReceiveSparkLine":{"data":[0,4.08,2.53,1.19,4.08,4.08,3.12],"totalChange":3.12},"detailsId":"vaal-orb"},"Orb of Horizons":{"currencyTypeName":"Orb of Horizons","pay":{"id":0,"league_id":1,"pay_currency_id":75,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.958204,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":75,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":31,"value":1.79100045,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-6.68,5.03,-3.73,-4.13,-2.13,-4.61],"totalChange":-4.61},"chaosEquivalent":1.42,"lowConfidencePaySparkLine":{"data":[0,-0.33,0.72,4.29,0.72,-3.63,4.36],"totalChange":4.36},"lowConfidenceReceiveSparkLine":{"data":[0,-6.68,5.03,-3.73,-4.13,-2.13,-4.61],"totalChange":-4.61},"detailsId":"orb-of-horizons"},"Splinter of Chayula":{"currencyTypeName":"Splinter of Chayula","pay":{"id":0,"league_id":1,"pay_currency_id":60,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":3,"value":0.83333,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":60,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":46,"value":1.5,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,5.26,-9.67,0.7,-21.05,-21.05,-21.05],"totalChange":-21.05},"chaosEquivalent":1.35,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,5.26,-9.67,0.7,-21.05,-21.05,-21.05],"totalChange":-21.05},"detailsId":"splinter-of-chayula"},"Gemcutter\'s Prism":{"currencyTypeName":"Gemcutter\'s Prism","pay":{"id":0,"league_id":1,"pay_currency_id":15,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":14,"value":0.7885894949494949,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":15,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":74,"value":1.3104130434782608,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,-0.9,-0.9,-1.01,4.44,-0.9,4.73],"totalChange":4.73},"receiveSparkLine":{"data":[0,4.2,4.37,1.67,5.04,1.93,1.19],"totalChange":1.19},"chaosEquivalent":1.29,"lowConfidencePaySparkLine":{"data":[0,-0.9,-0.9,-1.01,4.44,-0.9,4.73],"totalChange":4.73},"lowConfidenceReceiveSparkLine":{"data":[0,4.2,4.37,1.67,5.04,1.93,1.19],"totalChange":1.19},"detailsId":"gemcutters-prism"},"Apprentice Cartographer\'s Sextant":{"currencyTypeName":"Apprentice Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":46,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":14,"value":0.9750981212121212,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":46,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":52,"value":1,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-5.02,-6.61,-3.17,-2.11,-3.38,-4.22],"totalChange":-4.22},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":1.01,"lowConfidencePaySparkLine":{"data":[0,-5.02,-6.61,-3.17,-2.11,-3.38,-4.22],"totalChange":-4.22},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"apprentice-cartographers-sextant"},"Orb of Regret":{"currencyTypeName":"Orb of Regret","pay":{"id":0,"league_id":1,"pay_currency_id":9,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":18,"value":1.0964574468085106,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":9,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":92,"value":1.0004330666666668,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0.84,0.94,0.31,0.11,0.32],"totalChange":0.32},"receiveSparkLine":{"data":[0,0,0,0,1.51,0,0.04],"totalChange":0.04},"chaosEquivalent":0.96,"lowConfidencePaySparkLine":{"data":[0,0,0.84,0.94,0.31,0.11,0.32],"totalChange":0.32},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,1.51,0,0.04],"totalChange":0.04},"detailsId":"orb-of-regret"},"Regal Orb":{"currencyTypeName":"Regal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":7,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":10,"value":1.3920958247422681,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":7,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":73,"value":0.8269064536082474,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0.04,0,0,0,0.12,0.57],"totalChange":0.57},"receiveSparkLine":{"data":[0,-0.09,-2.23,0.79,-1.6,1.46,0.7],"totalChange":0.7},"chaosEquivalent":0.77,"lowConfidencePaySparkLine":{"data":[0,0.04,0,0,0,0.12,0.57],"totalChange":0.57},"lowConfidenceReceiveSparkLine":{"data":[0,-0.09,-2.23,0.79,-1.6,1.46,0.7],"totalChange":0.7},"detailsId":"regal-orb"},"Engineer\'s Orb":{"currencyTypeName":"Engineer\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":77,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":3,"value":2.605612244897959,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":77,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":17,"value":0.8584277931034483,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,18.02,26.46,12.78,12.41,12.81,11.17],"totalChange":11.17},"chaosEquivalent":0.62,"lowConfidencePaySparkLine":{"data":[0,2,11.98,11.98,30.74,30.74,30.49],"totalChange":30.49},"lowConfidenceReceiveSparkLine":{"data":[0,18.02,26.46,12.78,12.41,12.81,11.17],"totalChange":11.17},"detailsId":"engineers-orb"},"Orb of Fusing":{"currencyTypeName":"Orb of Fusing","pay":{"id":0,"league_id":1,"pay_currency_id":5,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":1.95,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":5,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":0.55044,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0.78,0.62,0.54,2.53,2.56],"totalChange":2.56},"receiveSparkLine":{"data":[0,-0.93,-2.39,-0.55,-1.99,-1,-0.92],"totalChange":-0.92},"chaosEquivalent":0.53,"lowConfidencePaySparkLine":{"data":[0,0,0.78,0.62,0.54,2.53,2.56],"totalChange":2.56},"lowConfidenceReceiveSparkLine":{"data":[0,-0.93,-2.39,-0.55,-1.99,-1,-0.92],"totalChange":-0.92},"detailsId":"orb-of-fusing"},"Orb of Scouring":{"currencyTypeName":"Orb of Scouring","pay":{"id":0,"league_id":1,"pay_currency_id":14,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":2.1,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":14,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":91,"value":0.5354012105263158,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,4.55,4.55,4.55,5.09,8.71,9.52],"totalChange":9.52},"receiveSparkLine":{"data":[0,0,0,0,0,-0.56,7.08],"totalChange":7.08},"chaosEquivalent":0.51,"lowConfidencePaySparkLine":{"data":[0,4.55,4.55,4.55,5.09,8.71,9.52],"totalChange":9.52},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,-0.56,7.08],"totalChange":7.08},"detailsId":"orb-of-scouring"},"Cartographer\'s Chisel":{"currencyTypeName":"Cartographer\'s Chisel","pay":{"id":0,"league_id":1,"pay_currency_id":10,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":2.4,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":10,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":58,"value":0.46549529545454543,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-3.14,-3.14,0.9,0.9,0.9,0.9],"totalChange":0.9},"receiveSparkLine":{"data":[0,0.97,-2.18,1.69,-2.38,-1.15,-0.13],"totalChange":-0.13},"chaosEquivalent":0.44,"lowConfidencePaySparkLine":{"data":[0,-3.14,-3.14,0.9,0.9,0.9,0.9],"totalChange":0.9},"lowConfidenceReceiveSparkLine":{"data":[0,0.97,-2.18,1.69,-2.38,-1.15,-0.13],"totalChange":-0.13},"detailsId":"cartographers-chisel"},"Orb of Alchemy":{"currencyTypeName":"Orb of Alchemy","pay":{"id":0,"league_id":1,"pay_currency_id":4,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":2.841666666666667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":4,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":65,"value":0.35714,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-0.63,0.07,6.42,6.41,2.75,4.86],"totalChange":4.86},"receiveSparkLine":{"data":[0,2.66,-5.08,-7.82,-6.04,-6.22,-14.4],"totalChange":-14.4},"chaosEquivalent":0.35,"lowConfidencePaySparkLine":{"data":[0,-0.63,0.07,6.42,6.41,2.75,4.86],"totalChange":4.86},"lowConfidenceReceiveSparkLine":{"data":[0,2.66,-5.08,-7.82,-6.04,-6.22,-14.4],"totalChange":-14.4},"detailsId":"orb-of-alchemy"},"Silver Coin":{"currencyTypeName":"Silver Coin","pay":{"id":0,"league_id":1,"pay_currency_id":12,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":15,"value":3.6,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":12,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.3146063292682927,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,5.33,2.76,0.91,2.92,3.72,3.72],"totalChange":3.72},"receiveSparkLine":{"data":[0,-8.82,-8.94,-8.94,-8.94,2.68,0.27],"totalChange":0.27},"chaosEquivalent":0.3,"lowConfidencePaySparkLine":{"data":[0,5.33,2.76,0.91,2.92,3.72,3.72],"totalChange":3.72},"lowConfidenceReceiveSparkLine":{"data":[0,-8.82,-8.94,-8.94,-8.94,2.68,0.27],"totalChange":0.27},"detailsId":"silver-coin"},"Blessed Orb":{"currencyTypeName":"Blessed Orb","pay":{"id":0,"league_id":1,"pay_currency_id":18,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":10,"value":3.7901630434782607,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":18,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":53,"value":0.32171585542168674,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.1,0.06,0.06,0.7,0.23,0.25],"totalChange":0.25},"receiveSparkLine":{"data":[0,0,-1.04,-1.47,-1.55,0,-3.48],"totalChange":-3.48},"chaosEquivalent":0.29,"lowConfidencePaySparkLine":{"data":[0,0.1,0.06,0.06,0.7,0.23,0.25],"totalChange":0.25},"lowConfidenceReceiveSparkLine":{"data":[0,0,-1.04,-1.47,-1.55,0,-3.48],"totalChange":-3.48},"detailsId":"blessed-orb"},"Chromatic Orb":{"currencyTypeName":"Chromatic Orb","pay":{"id":0,"league_id":1,"pay_currency_id":17,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":30,"value":3.900757575757576,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":17,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":91,"value":0.27702283333333333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-1.17,-1.9,-0.9,-0.75,0.03,0.01],"totalChange":0.01},"receiveSparkLine":{"data":[0,-1.38,-1.35,-2.08,-2.08,-2.08,-2.35],"totalChange":-2.35},"chaosEquivalent":0.27,"lowConfidencePaySparkLine":{"data":[0,-1.17,-1.9,-0.9,-0.75,0.03,0.01],"totalChange":0.01},"lowConfidenceReceiveSparkLine":{"data":[0,-1.38,-1.35,-2.08,-2.08,-2.08,-2.35],"totalChange":-2.35},"detailsId":"chromatic-orb"},"Orb of Binding":{"currencyTypeName":"Orb of Binding","pay":{"id":0,"league_id":1,"pay_currency_id":74,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":6,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":74,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":28,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":0.25,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"orb-of-binding"},"Splinter of Xoph":{"currencyTypeName":"Splinter of Xoph","pay":{"id":0,"league_id":1,"pay_currency_id":56,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":8,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":56,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":29,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-5.08,-14.97,8.86,-18.21,-14.21,-20.82],"totalChange":-20.82},"chaosEquivalent":0.23,"lowConfidencePaySparkLine":{"data":[null,null,0,14.29,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,-5.08,-14.97,8.86,-18.21,-14.21,-20.82],"totalChange":-20.82},"detailsId":"splinter-of-xoph"},"Splinter of Uul-Netol":{"currencyTypeName":"Splinter of Uul-Netol","pay":{"id":0,"league_id":1,"pay_currency_id":59,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":15,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":59,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,1.07,1.07,1.07,1.07,1.07,1.07],"totalChange":1.07},"chaosEquivalent":0.2,"lowConfidencePaySparkLine":{"data":[null,null,0,50,50,50,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,1.07,1.07,1.07,1.07,1.07,1.07],"totalChange":1.07},"detailsId":"splinter-of-uul-netol"},"Orb of Alteration":{"currencyTypeName":"Orb of Alteration","pay":{"id":0,"league_id":1,"pay_currency_id":6,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":32,"value":6.897234042553191,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":6,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":61,"value":0.14286,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,3.09,4.16,5.69,9.14,5.69,4.2],"totalChange":4.2},"receiveSparkLine":{"data":[0,-0.03,-0.5,-0.41,-0.73,0,0],"totalChange":0},"chaosEquivalent":0.14,"lowConfidencePaySparkLine":{"data":[0,3.09,4.16,5.69,9.14,5.69,4.2],"totalChange":4.2},"lowConfidenceReceiveSparkLine":{"data":[0,-0.03,-0.5,-0.41,-0.73,0,0],"totalChange":0},"detailsId":"orb-of-alteration"},"Jeweller\'s Orb":{"currencyTypeName":"Jeweller\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":11,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":24,"value":7.8,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":11,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":75,"value":0.13261883720930231,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.3,1.86,3.61,3.33,4.92,6.27],"totalChange":6.27},"receiveSparkLine":{"data":[0,-1.86,1.35,-2.11,-3.08,-1.86,-2.39],"totalChange":-2.39},"chaosEquivalent":0.13,"lowConfidencePaySparkLine":{"data":[0,0.3,1.86,3.61,3.33,4.92,6.27],"totalChange":6.27},"lowConfidenceReceiveSparkLine":{"data":[0,-1.86,1.35,-2.11,-3.08,-1.86,-2.39],"totalChange":-2.39},"detailsId":"jewellers-orb"},"Orb of Chance":{"currencyTypeName":"Orb of Chance","pay":{"id":0,"league_id":1,"pay_currency_id":16,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":7,"value":8.64997340425532,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":16,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":76,"value":0.11111,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-3.04,0.02,0.72,-0.25,-0.36,7.21],"totalChange":7.21},"receiveSparkLine":{"data":[0,0,1.83,0,-2.24,0,-5.56],"totalChange":-5.56},"chaosEquivalent":0.11,"lowConfidencePaySparkLine":{"data":[0,-3.04,0.02,0.72,-0.25,-0.36,7.21],"totalChange":7.21},"lowConfidenceReceiveSparkLine":{"data":[0,0,1.83,0,-2.24,0,-5.56],"totalChange":-5.56},"detailsId":"orb-of-chance"},"Glassblower\'s Bauble":{"currencyTypeName":"Glassblower\'s Bauble","pay":{"id":0,"league_id":1,"pay_currency_id":19,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":15.31340206185567,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":19,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":51,"value":0.14286,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-0.12,0,1.2,2.08,3.07,3.07],"totalChange":3.07},"chaosEquivalent":0.1,"lowConfidencePaySparkLine":{"data":[0,0,-1.94,3.94,3.9,3.9,9.05],"totalChange":9.05},"lowConfidenceReceiveSparkLine":{"data":[0,-0.12,0,1.2,2.08,3.07,3.07],"totalChange":3.07},"detailsId":"glassblowers-bauble"},"Splinter of Tul":{"currencyTypeName":"Splinter of Tul","pay":{"id":0,"league_id":1,"pay_currency_id":57,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":20,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":57,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":23,"value":0.14089376744186047,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,4.1,4.81,5.81,5.86,9.04,18.99],"totalChange":18.99},"chaosEquivalent":0.1,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,4.1,4.81,5.81,5.86,9.04,18.99],"totalChange":18.99},"detailsId":"splinter-of-tul"},"Splinter of Esh":{"currencyTypeName":"Splinter of Esh","pay":{"id":0,"league_id":1,"pay_currency_id":58,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":20,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":58,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":29,"value":0.1326773181818182,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0.47,0.74,8.18,8.18,8.18,0.47],"totalChange":0.47},"chaosEquivalent":0.09,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0.47,0.74,8.18,8.18,8.18,0.47],"totalChange":0.47},"detailsId":"splinter-of-esh"},"Orb of Augmentation":{"currencyTypeName":"Orb of Augmentation","pay":{"id":0,"league_id":1,"pay_currency_id":20,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":5,"value":42.121212121212125,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":20,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.035082486842105264,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[null,null,null,null,null,null,0],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,1.83,5.26],"totalChange":5.26},"chaosEquivalent":0.03,"lowConfidencePaySparkLine":{"data":[0,-45.46,-46.56,-41.35,-39.88,-39.88,-42.9],"totalChange":-42.9},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,1.83,5.26],"totalChange":5.26},"detailsId":"orb-of-augmentation"},"Blacksmith\'s Whetstone":{"currencyTypeName":"Blacksmith\'s Whetstone","pay":{"id":0,"league_id":1,"pay_currency_id":25,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":137.4747474747475,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":25,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":38,"value":0.024965935064935066,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,21.31,20.44,18.01,21.49,17.2,20.28],"totalChange":20.28},"receiveSparkLine":{"data":[0,-12.72,-18.33,-18.7,-16.53,-16.53,-16.64],"totalChange":-16.64},"chaosEquivalent":0.02,"lowConfidencePaySparkLine":{"data":[0,21.31,20.44,18.01,21.49,17.2,20.28],"totalChange":20.28},"lowConfidenceReceiveSparkLine":{"data":[0,-12.72,-18.33,-18.7,-16.53,-16.53,-16.64],"totalChange":-16.64},"detailsId":"blacksmiths-whetstone"},"Perandus Coin":{"currencyTypeName":"Perandus Coin","pay":{"id":0,"league_id":1,"pay_currency_id":13,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":200,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":13,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":0.011368279569892474,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,2.35,-7.37,-12.56,-16.67,-10.22,-4.79],"totalChange":-4.79},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0.22,-2.43,-4.97,-4.97,2.72,2.72],"totalChange":2.72},"lowConfidenceReceiveSparkLine":{"data":[0,2.35,-7.37,-12.56,-16.67,-10.22,-4.79],"totalChange":-4.79},"detailsId":"perandus-coin"},"Orb of Transmutation":{"currencyTypeName":"Orb of Transmutation","pay":{"id":0,"league_id":1,"pay_currency_id":21,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":196.62,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":21,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":53,"value":0.01613,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0,null,21.78,21.78,null,null],"totalChange":21.78},"receiveSparkLine":{"data":[0,0,-0.42,-0.12,-2.46,-5.76,-3.24],"totalChange":-3.24},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0,-1.33,21.78,21.78,22.08,22.06],"totalChange":22.06},"lowConfidenceReceiveSparkLine":{"data":[0,0,-0.42,-0.12,-2.46,-5.76,-3.24],"totalChange":-3.24},"detailsId":"orb-of-transmutation"},"Portal Scroll":{"currencyTypeName":"Portal Scroll","pay":{"id":0,"league_id":1,"pay_currency_id":24,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":364.8484848484849,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":24,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":38,"value":0.014209822916666667,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,-0.12,-4.8,-4.8,-14.76],"totalChange":-14.76},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,-23.5,14.82,46.05,46.05,52.82,76.13],"totalChange":76.13},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,-0.12,-4.8,-4.8,-14.76],"totalChange":-14.76},"detailsId":"portal-scroll"},"Armourer\'s Scrap":{"currencyTypeName":"Armourer\'s Scrap","pay":{"id":0,"league_id":1,"pay_currency_id":26,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":6,"value":197.55050505050505,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":26,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":0.02,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[null,null,null,0,0,null,4.57],"totalChange":4.57},"receiveSparkLine":{"data":[0,0.72,1.65,10.01,9.9,10.01,10.01],"totalChange":10.01},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0,1.53,0.71,0.71,1.73,5.31],"totalChange":5.31},"lowConfidenceReceiveSparkLine":{"data":[0,0.72,1.65,10.01,9.9,10.01,10.01],"totalChange":10.01},"detailsId":"armourers-scrap"}},"updated":1548166976379}'),FIXED_CURRENCY_VALUES2=JSON.parse('{"map":{"orb-of-alchemy":{"chaosEquivalent":0.3508771929824561,"currencyTypeName":"Orb of Alchemy","detailsId":"orb-of-alchemy"},"orb-of-annulment":{"chaosEquivalent":10,"currencyTypeName":"Orb of Annulment","detailsId":"orb-of-annulment"},"artificers-orb":{"chaosEquivalent":0.3846153846153846,"currencyTypeName":"Artificer\'s Orb","detailsId":"artificers-orb"},"orb-of-augmentation":{"chaosEquivalent":0.016666666666666666,"currencyTypeName":"Orb of Augmentation","detailsId":"orb-of-augmentation"},"glassblowers-bauble":{"chaosEquivalent":0.8333333333333334,"currencyTypeName":"Glassblower\'s Bauble","detailsId":"glassblowers-bauble"},"orb-of-chance":{"chaosEquivalent":5,"currencyTypeName":"Orb of Chance","detailsId":"orb-of-chance"},"chaos-orb":{"chaosEquivalent":3.9000000001560005,"currencyTypeName":"Chaos Orb","detailsId":"chaos-orb"},"divine-orb":{"chaosEquivalent":188.9999996787,"currencyTypeName":"Divine Orb","detailsId":"divine-orb"},"arcanists-etcher":{"chaosEquivalent":0.3333333333333333,"currencyTypeName":"Arcanist\'s Etcher","detailsId":"arcanists-etcher"},"exalted-orb":{"chaosEquivalent":1,"currencyTypeName":"Exalted Orb","detailsId":"exalted-orb"},"gemcutters-prism":{"chaosEquivalent":1.450000000029,"currencyTypeName":"Gemcutter\'s Prism","detailsId":"gemcutters-prism"},"mirror-of-kalandra":{"chaosEquivalent":30000.030000029998,"currencyTypeName":"Mirror of Kalandra","detailsId":"mirror-of-kalandra"},"regal-orb":{"chaosEquivalent":0.07692307692307693,"currencyTypeName":"Regal Orb","detailsId":"regal-orb"},"armourers-scrap":{"chaosEquivalent":0.5,"currencyTypeName":"Armourer\'s Scrap","detailsId":"armourers-scrap"},"orb-of-transmutation":{"chaosEquivalent":0.01818181818181818,"currencyTypeName":"Orb of Transmutation","detailsId":"orb-of-transmutation"},"vaal-orb":{"chaosEquivalent":0.16666666666666666,"currencyTypeName":"Vaal Orb","detailsId":"vaal-orb"},"blacksmiths-whetstone":{"chaosEquivalent":0.5,"currencyTypeName":"Blacksmith\'s Whetstone","detailsId":"blacksmiths-whetstone"},"scroll-of-wisdom":{"chaosEquivalent":0.9000000000089999,"currencyTypeName":"Scroll of Wisdom","detailsId":"scroll-of-wisdom"}},"lines":[{"chaosEquivalent":30000.030000029998,"currencyTypeName":"Mirror of Kalandra","detailsId":"mirror-of-kalandra"},{"chaosEquivalent":188.9999996787,"currencyTypeName":"Divine Orb","detailsId":"divine-orb"},{"chaosEquivalent":10,"currencyTypeName":"Orb of Annulment","detailsId":"orb-of-annulment"},{"chaosEquivalent":5,"currencyTypeName":"Orb of Chance","detailsId":"orb-of-chance"},{"chaosEquivalent":3.9000000001560005,"currencyTypeName":"Chaos Orb","detailsId":"chaos-orb"},{"chaosEquivalent":1.450000000029,"currencyTypeName":"Gemcutter\'s Prism","detailsId":"gemcutters-prism"},{"chaosEquivalent":1,"currencyTypeName":"Exalted Orb","detailsId":"exalted-orb"},{"chaosEquivalent":0.9000000000089999,"currencyTypeName":"Scroll of Wisdom","detailsId":"scroll-of-wisdom"},{"chaosEquivalent":0.8333333333333334,"currencyTypeName":"Glassblower\'s Bauble","detailsId":"glassblowers-bauble"},{"chaosEquivalent":0.5,"currencyTypeName":"Armourer\'s Scrap","detailsId":"armourers-scrap"},{"chaosEquivalent":0.5,"currencyTypeName":"Blacksmith\'s Whetstone","detailsId":"blacksmiths-whetstone"},{"chaosEquivalent":0.3846153846153846,"currencyTypeName":"Artificer\'s Orb","detailsId":"artificers-orb"},{"chaosEquivalent":0.3508771929824561,"currencyTypeName":"Orb of Alchemy","detailsId":"orb-of-alchemy"},{"chaosEquivalent":0.3333333333333333,"currencyTypeName":"Arcanist\'s Etcher","detailsId":"arcanists-etcher"},{"chaosEquivalent":0.16666666666666666,"currencyTypeName":"Vaal Orb","detailsId":"vaal-orb"},{"chaosEquivalent":0.07692307692307693,"currencyTypeName":"Regal Orb","detailsId":"regal-orb"},{"chaosEquivalent":0.01818181818181818,"currencyTypeName":"Orb of Transmutation","detailsId":"orb-of-transmutation"},{"chaosEquivalent":0.016666666666666666,"currencyTypeName":"Orb of Augmentation","detailsId":"orb-of-augmentation"}],"currencyDetails":[{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lVcGdyYWRlVG9SYXJlIiwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/9b80b44821/CurrencyUpgradeToRare.png","id":0,"name":"Orb of Alchemy","tradeId":"alch"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQW5udWxsT3JiIiwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/2daba8ccca/AnnullOrb.png","id":1,"name":"Orb of Annulment","tradeId":"annul"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lBZGRFcXVpcG1lbnRTb2NrZXQiLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/5131fd4774/CurrencyAddEquipmentSocket.png","id":2,"name":"Artificer\'s Orb","tradeId":"artificers"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lBZGRNb2RUb01hZ2ljIiwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/c8ad0ddc84/CurrencyAddModToMagic.png","id":3,"name":"Orb of Augmentation","tradeId":"aug"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lGbGFza1F1YWxpdHkiLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/1cec279e01/CurrencyFlaskQuality.png","id":4,"name":"Glassblower\'s Bauble","tradeId":"bauble"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lVcGdyYWRlVG9VbmlxdWUiLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/93c6cc8d5b/CurrencyUpgradeToUnique.png","id":5,"name":"Orb of Chance","tradeId":"chance"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxSYXJlIiwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/c0ca392a78/CurrencyRerollRare.png","id":6,"name":"Chaos Orb","tradeId":"chaos"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/2986e220b3/CurrencyModValues.png","id":7,"name":"Divine Orb","tradeId":"divine"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lXZWFwb25NYWdpY1F1YWxpdHkiLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/516e8f1131/CurrencyWeaponMagicQuality.png","id":8,"name":"Arcanist\'s Etcher","tradeId":"etcher"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lBZGRNb2RUb1JhcmUiLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/ad7c366789/CurrencyAddModToRare.png","id":9,"name":"Exalted Orb","tradeId":"exalted"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lHZW1RdWFsaXR5Iiwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/f4bace18d7/CurrencyGemQuality.png","id":10,"name":"Gemcutter\'s Prism","tradeId":"gcp"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lEdXBsaWNhdGUiLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/26bc31680e/CurrencyDuplicate.png","id":11,"name":"Mirror of Kalandra","tradeId":"mirror"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lVcGdyYWRlTWFnaWNUb1JhcmUiLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/e8fb148e80/CurrencyUpgradeMagicToRare.png","id":12,"name":"Regal Orb","tradeId":"regal"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lBcm1vdXJRdWFsaXR5Iiwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/d5868f596d/CurrencyArmourQuality.png","id":13,"name":"Armourer\'s Scrap","tradeId":"scrap"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lVcGdyYWRlVG9NYWdpYyIsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/2f8e1ff9f8/CurrencyUpgradeToMagic.png","id":14,"name":"Orb of Transmutation","tradeId":"transmute"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lWYWFsIiwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/72bc84396c/CurrencyVaal.png","id":15,"name":"Vaal Orb","tradeId":"vaal"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lXZWFwb25RdWFsaXR5Iiwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/18715ea7be/CurrencyWeaponQuality.png","id":16,"name":"Blacksmith\'s Whetstone","tradeId":"whetstone"},{"icon":"https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lJZGVudGlmaWNhdGlvbiIsInNjYWxlIjoxLCJyZWFsbSI6InBvZTIifV0/884f7bc58b/CurrencyIdentification.png","id":17,"name":"Scroll of Wisdom","tradeId":"wisdom"}],"updated":1737725366755}');
  var gemNames=["Absolution","Abyssal Cry","Accuracy And Crits Aura","Accuracy And Crits Aura Royale","Ambush","Ancestor Totem Slam","Ancestor Totem Slam Royale","Ancestor Totem Slash","Ancestral Cry","Ancestral Slam Support","Ancestral Slam Support Royale","Anger","Animate Armour","Animate Guardian Weapon","Animate Weapon","Arborix Quick Dodge","Arc","Arcane Cloak","Arcane Wake","Arctic Armour","Arctic Breath","Arctic Breath Royale","Artillery Ballista","Artillery Ballista Royale","Ashwaker Summon Raging Spirit On Kill","Assassins Mark","Assassins Mark Royale","Assassins Mark Triggered","Atziri Unique Staff Flameblast","Atziri Unique Staff Storm Call","Avian Tornado","Backstab","Ball Lightning","Ball Lightning Royale","Barrage","Battlemages Cry","Battlemages Cry Support","Bear Trap","Bear Trap Royale","Berserk","Bird Aspect","Black Hole","Black Hole Royale","Blade Blast","Blade Blast Royale","Blade Trap","Blade Vortex","Blade Vortex Royale","Bladefall","Bladefall Royale","Bladestorm","Bladestorm Royale","Blast Rain","Blast Rain Royale","Blight","Blight Royale","Blink Arrow","Blink Arrow Royale","Blitz","Blood Offering","Blood Rage","Blood Sacrament Unique","Blood Sand Armour","Blood Sand Stance","Blood Sand Stance Royale","Blood Spears","Blood Whirl","Bloodreap","Bloodreap Royale","Bloodstained Banner","Bone Armour","Bone Lance","Bone Lance Royale","Bone Offering","Bone Offering Triggered Unique","Boneshatter","Brand Detonate","Brand Support","Burning Arrow","Burning Arrow Royale","Call Of The Wild","Capture Monster","Cast Aura Blinding","Cat Aspect","Cataclysm Sigil","Cats Stealth Triggered Intimidating Cry","Chain Strike","Chain Strike Royale","Channelled Snipe","Channelled Snipe Support","Chaos Degen Aura Unique","Charged Attack","Charged Attack Royale","Charged Dash","Charged Dash Royale","Circle Of Power","Clarity","Clarity Royale","Cleave","Cleave Royale","Cluster Burst","Cobra Lash","Cobra Lash Royale","Coiling Assault","Cold Aegis","Cold Impurity","Cold Projectile Mine","Cold Resist Aura","Cold Snap","Cold Snap Royale","Combo Strike","Conductivity","Conduit Sigil","Consecrated Path","Contagion","Conversion Trap","Convocation","Corpse Eruption","Corpse Eruption Royale","Corpse Walk","Corpse Warp","Corrosive Shroud","Corrupting Fever","Crab Aspect","Create Fungal Ground On Kill","Create Smoke Cloud","Curse Pillar","Cyclone","Cyclone Royale","Damage Infusion","Damage Over Time Aura","Dark Pact","Dark Pact Royale","Dark Ritual","Darktongue Kiss","Death Walk","Death Wish","Decoy Totem","Defiance Banner","Delve Mod Socketed Attack Damage Final 1 H","Delve Mod Socketed Attack Damage Final 2 H","Delve Mod Socketed Attack Flat Mana Cost","Delve Mod Socketed Attack Speed","Delve Mod Socketed Cast Speed","Delve Mod Socketed Spell Damage Final 1 H","Delve Mod Socketed Spell Damage Final 2 H","Delve Mod Socketed Spell Mana Cost","Desecrate","Desecrate Royale","Despair","Despair Royale","Destructive Link","Determination","Detonate Dead","Detonate Dead Royale","Devouring Totem","Discharge","Discipline","Discorectangle Slam","Disintegrate","Divine Fire Beam Unique","Divine Tempest","Divine Tempest Royale","Dominating Blow","Dominating Blow Royale","Doom Blast","Double Slash","Double Slash Royale","Double Strike","Dual Strike","Dual Strike Royale","Earthquake","Earthquake Royale","Elemental Aegis","Elemental Hit","Elemental Hit Royale","Elemental Projectiles","Elemental Weakness","Elemental Weakness Royale","Ember","Ember Royale","Embrace Madness","Enchantment Of Blades On Hit","Enchantment Of Blades On Hit 2","Enchantment Of Blades On Hit 3","Enchantment Of Blades On Hit 4","Enchantment Of Flames On Hit","Enchantment Of Flames On Hit 2","Enchantment Of Flames On Hit 3","Enchantment Of Flames On Hit 4","Enchantment Of Force On Hit","Enchantment Of Force On Hit 2","Enchantment Of Force On Hit 3","Enchantment Of Force On Hit 4","Enchantment Of Frost On Kill","Enchantment Of Frost On Kill 2","Enchantment Of Frost On Kill 3","Enchantment Of Frost On Kill 4","Enchantment Of Fury On Hit","Enchantment Of Fury On Hit 2","Enchantment Of Fury On Hit 3","Enchantment Of Fury On Hit 4","Enchantment Of Inferno On Kill","Enchantment Of Inferno On Kill 2","Enchantment Of Inferno On Kill 3","Enchantment Of Inferno On Kill 4","Enchantment Of Ire When Hit","Enchantment Of Ire When Hit 2","Enchantment Of Ire When Hit 3","Enchantment Of Ire When Hit 4","Enchantment Of Light When Crit","Enchantment Of Light When Crit 2","Enchantment Of Light When Crit 3","Enchantment Of Light When Crit 4","Enchantment Of Reflection When Hit","Enchantment Of Reflection When Hit 2","Enchantment Of Reflection When Hit 3","Enchantment Of Reflection When Hit 4","Enchantment Of Spite When Hit","Enchantment Of Spite When Hit 2","Enchantment Of Spite When Hit 3","Enchantment Of Spite When Hit 4","Enchantment Of Tempest On Hit","Enchantment Of Tempest On Hit 2","Enchantment Of Tempest On Hit 3","Enchantment Of Tempest On Hit 4","Enchantment Of The Grave On Kill","Enchantment Of The Grave On Kill 2","Enchantment Of The Grave On Kill 3","Enchantment Of The Grave On Kill 4","Enchantment Of Thunder On Kill","Enchantment Of Thunder On Kill 2","Enchantment Of Thunder On Kill 3","Enchantment Of Thunder On Kill 4","Enchantment Of War On Kill","Enchantment Of War On Kill 2","Enchantment Of War On Kill 3","Enchantment Of War On Kill 4","Enchantment Of Winter When Hit","Enchantment Of Winter When Hit 2","Enchantment Of Winter When Hit 3","Enchantment Of Winter When Hit 4","Endurance Charge On Melee Stun","Endurance Charge Slam","Enduring Cry","Enduring Cry Royale","Energy Blade","Enfeeble","Ensnaring Arrow","Ensnaring Arrow Royale","Envy","Essence Drain","Essence Drain Royale","Ethereal Knives","Ethereal Knives Royale","Expanding Fire Cone","Expanding Fire Cone Royale","Explosive Arrow","Explosive Arrow Royale","Explosive Concoction","Exsanguinate","Eye Of Winter","Feast Of Flesh","Fiery Impact Heist Mace Implicit","Fire Aegis","Fire Beam","Fire Burst On Hit","Fire Chasm","Fire Impurity","Fire Resist Aura","Fire Trap","Fire Trap Royale","Fire Weapon","Fireball","Fireball Royale","Firestorm","Firestorm Royale","Firewall","Flame Dash","Flame Dash Royale","Flame Link","Flame Totem","Flame Totem Royale","Flame Whip","Flameblast","Flamethrower Trap","Flamethrower Trap Royale","Flammability","Flesh Offering","Flesh Offering Triggered Unique","Flicker Strike","Forbidden Rite","Freezing Pulse","Freezing Pulse Royale","Frenzy","Frost Blades","Frost Blades Royale","Frost Bolt","Frost Bolt Nova","Frost Bolt Nova Royale","Frost Bolt Royale","Frost Bomb","Frost Bomb Royale","Frost Fury","Frost Globe","Frost Wall","Frostbite","Gem Detonate Mines","Generals Cry","Generals Cry Royale","Generals Cry Support","Generals Cry Support Royale","Glacial Cascade","Glacial Cascade Royale","Glacial Hammer","Glacial Hammer Royale","Glimpse Of Eternity","Gore Shockwave","Grace","Ground Slam","Ground Slam Royale","Haste","Hatred","Heavy Strike","Heavy Strike Royale","Herald Of Agony","Herald Of Ash","Herald Of Blood","Herald Of Ice","Herald Of Purity","Herald Of Thunder","Hidden Blade","Ice Crash","Ice Crash Royale","Ice Dash","Ice Dash Royale","Ice Nova","Ice Nova Royale","Ice Shot","Ice Shot Royale","Ice Siphon Trap","Ice Siphon Trap Royale","Ice Spear","Ice Spear Royale","Ice Trap","Ice Trap Royale","Icefire","Icestorm Unique Staff 12","Ignite","Immolation Sigil","Immortal Call","Impacting Steel","Impacting Steel Reload","Implicit Support Mana Multiplier","Implicit Support Reduced Mana Reserved","Infernal Blow","Infernal Blow Royale","Infernal Cry On Hit Explosion","Infernal Swarm","Infernal Sweep","Intimidating Cry","Intimidaying Cry Triggered","Intuitive Link","Jun Triggered Blood Rage","Kinetic Bolt","Lancing Steel","Leap Slam","Leap Slam Royale","Lightning Aegis","Lightning Arrow","Lightning Arrow Royale","Lightning Channel","Lightning Circle","Lightning Explosion Mine","Lightning Impurity","Lightning Resist Aura","Lightning Spell","Lightning Strike","Lightning Tendrils Channelled","Lightning Tendrils Channelled Royale","Lightning Tower Trap","Lightning Tower Trap Royale","Lightning Trap","Lightning Trap Royale","Lightning Warp","Lightning Warp Royale","Magma Orb","Magma Orb Royale","Magma Sigil","Mamba Strike","Manabond","Merveil Warp","Minion Focus Fire","Mirror Arrow","Mod Socketed Skills Spend Energy Shield Before Mana","Mod Socketed Skills Trigger Granted Skill","Mod Support Chain","Mod Support Fork","Mod Support Movement Skills Cost No Mana","Mod Support Reduced Mana Reserved","Mod Support Socketed Attacks Critical Strike Chance","Mod Support Socketed Attacks Critical Strike Multiplier","Mod Support Socketed Spells Critical Strike Chance","Mod Support Socketed Spells Critical Strike Multiplier","Mod Travel Skills Deal More Damage","Molten Shell","Molten Strike","Molten Strike Royale","Mortar Barrage Mine","New New Blade Vortex","New Phase Run","New Phase Run Royale","New Punishment","New Shield Charge","New Shield Charge Royale","New Shock Nova","New Sunder","New Sunder Royale","Oil Arrow","On Hit While Cursed Triggered Curse Nova","Orb Of Storms","Petrified Blood","Phys Cascade Trap","Physical Aegis","Physical Damage Aura","Player Melee","Poachers Mark","Poachers Mark Royale","Poachers Mark Triggered","Poison Arrow","Poison Arrow Royale","Poisonous Concoction","Portal","Power Siphon","Projectile Portal","Protective Link","Puncture","Puncture Royale","Punishment","Puresteel Banner","Purge","Purge Royale","Purity","Queens Demand","Quick Block","Quick Dodge","Quick Dodge Royale","Quick Guard","Rage Vortex","Rain Of Arrows","Rain Of Arrows On Attacking With Bow","Rain Of Arrows Royale","Rain Of Spores","Rain Of Spores On Attacking With Bow","Rain Of Spores Royale","Raise Spectre","Raise Zombie","Rallying Cry","Reave","Reckoning","Reduced Mana Corrupted","Reduced Mana Corrupted Special","Reduced Mana Corrupted V 2","Rejuvenation Totem","Rejuvenation Totem Royale","Rending Steel","Repeating Shockwave","Replicate","Righteous Fire","Righteous Lightning","Riposte","Riptide","Rune Blast","Sanctify","Sanctify Royale","Scourge Arrow","Scourge Arrow Royale","Searing Bond","Searing Bond Royale","Seismic Cry","Serpent Strike","Shade Form","Shade Form When Hit","Shadow Blades","Shattering Steel","Shattering Steel Royale","Shield Crush","Shield Shatter","Shock Nova","Shock Nova Royale","Shockwave Totem","Shockwave Totem Royale","Shrapnel Ballista","Shrapnel Shot","Shrapnel Shot Royale","Shrapnel Trap","Siege Ballista","Siege Ballista Royale","Sigil Recall","Skitterbots","Slice And Dice","Slither","Smite","Smite Royale","Smoke Mine","Smoke Mine Royale","Snapping Adder","Snapping Adder Royale","Snipe","Snipers Mark","Soul Link","Soulrend","Spark","Spectral Helix","Spectral Spinning Weapon","Spell Damage Aura","Spellslinger","Spider Aspect","Spike Slam","Spirit Burst","Spirit Offering","Spirit Offering Triggered Unique","Split Arrow","Static Strike","Static Tether","Storm Burst New","Storm Call","Storm Call Royale","Storm Cascade Triggered","Storm Rain","Stormbind","Summon Arbalists","Summon Beastial Rhoa","Summon Beastial Snake","Summon Beastial Ursa","Summon Bone Golem","Summon Chaos Golem","Summon Essence Spirits","Summon Fire Golem","Summon Harbinger Of Brutality","Summon Harbinger Of Brutality Uber","Summon Harbinger Of Directions","Summon Harbinger Of Directions Uber","Summon Harbinger Of Focus","Summon Harbinger Of Focus Uber","Summon Harbinger Of Storms","Summon Harbinger Of Storms Uber","Summon Harbinger Of The Arcane","Summon Harbinger Of The Arcane Uber","Summon Harbinger Of Time","Summon Harbinger Of Time Uber","Summon Ice Golem","Summon Lightning Golem","Summon Petrification Statue","Summon Raging Spirit","Summon Raging Spirit Royale","Summon Reaper","Summon Relic","Summon Rigwalds Pack","Summon Rock Golem","Summon Skeletons","Summon Skeletons Channelled","Summon Skeletons Royale","Summon Taunting Contraption","Summon Void Sphere","Support Added Chaos Damage","Support Added Chaos Damage Plus","Support Added Cold Damage","Support Added Cold Damage Plus","Support Added Cold Damage Royale","Support Added Fire Damage","Support Added Fire Damage Essence 1","Support Added Fire Damage Plus","Support Added Lightning Damage","Support Added Lightning Damage Plus","Support Added Lightning Damage Royale","Support Additional Accuracy","Support Additional Cooldown","Support Additional Cooldown Royale","Support Additional Level","Support Additional Projectiles Unique","Support Additional Quality","Support Additional Trap Mine","Support Additional XP","Support Ailments","Support Ancestral Call Plus","Support Arcane Surge","Support Archmage","Support Arrow Nova","Support Arrow Nova Plus","Support Arrow Nova Royale","Support Attack And Cast Speed Final Essence 1","Support Attack And Cast Speed Final Essence New 1","Support Aura Duration","Support Aura Effect Essence 1","Support Auras Reserve No Mana Unique","Support Barrage","Support Behead","Support Blasphemy","Support Blasphemy Plus","Support Blasphemy Royale","Support Blind","Support Blind Royale","Support Block Reduction","Support Blood Magic","Support Blood Magic Unique Prism Guardian","Support Bloodlust","Support Bloodthirst","Support Blunt Weapon","Support Blunt Weapon Shockwave","Support Bonechill","Support Brand Support","Support Brutality","Support Brutality Plus","Support Burning Damage Plus","Support Burning Minions","Support Cast Linked Curses On Curse","Support Cast On Crit","Support Cast On Crit Plus","Support Cast On Crit Triggered","Support Cast On Crit Triggered Plus","Support Cast On Damage Taken","Support Cast On Death","Support Cast On Death Royale","Support Cast On Mana Spent","Support Cast On Melee Kill","Support Cast On Melee Kill Triggered","Support Cast On Stunned","Support Cast While Channelling","Support Cast While Channelling Plus","Support Cast While Channelling Royale","Support Cast While Channelling Triggered","Support Cast While Channelling Triggered Plus","Support Cast While Channelling Triggered Royale","Support Chain","Support Chain Plus","Support Chance To Bleed","Support Chance To Bleed Royale","Support Chance To Flee","Support Chance To Flee Unique Al Dhih","Support Chance To Ignite","Support Chance To Ignite Essence 1","Support Chance To Poison","Support Chaos Attacks","Support Charged Mines","Support Cluster Trap","Support Cold Penetration","Support Cold Penetration Plus","Support Cold To Fire","Support Concentrated Effect","Support Concentrated Effect Royale","Support Controlled Destruction","Support Controlled Destruction Plus","Support Critical Strike Affliction","Support Critical Strike Chance Essence 1","Support Cruelty","Support Culling Strike","Support Curse Auras Affect You Unique","Support Curse On Hit","Support Curse On Hit Curse","Support Curse On Hit Curse Plus","Support Curse On Hit Plus","Support Curse Pillar Trigger Curses","Support Curse Pillar Trigger Curses Less Curse Effect","Support Damage Against Chilled","Support Damage On Low Life Essence 1","Support Damage Over Time","Support Dark Ritual","Support Deadly Ailments","Support Deadly Ailments Plus","Support Debilitate","Support Decay","Support Double Damage","Support Earthbreaker","Support Efficacy","Support Elemental Damage Final Essence 1","Support Elemental Focus","Support Elemental Focus Plus","Support Elemental Penetration","Support Elemental Proliferation","Support Energy Shield Leech","Support Faster Attack","Support Faster Attack Royale","Support Faster Cast","Support Faster Cast Royale","Support Faster Projectiles","Support Faster Projectiles Royale","Support Fire Penetration","Support Fire Penetration Plus","Support Focused Ballista","Support Fork","Support Fork Plus","Support Fortify","Support Fortify Royale","Support Frenzy Charge On Slaying Frozen Enemy","Support Gem Frenzy Power On Trap Trigger","Support Gem Mirage Archer","Support Generosity","Support Generosity Plus","Support Greater Multiple Projectiles","Support Greater Multiple Projectiles Plus","Support Greater Spell Echo","Support Greater Volley","Support Handcast Anticipation","Support Handcast Anticipation Royale","Support Handcast Rapid Fire","Support Handcast Spell Boost","Support Ignite Proliferation","Support Immolation","Support Impale","Support Increased Area Of Effect","Support Increased Area Of Effect Plus","Support Increased Area Of Effect Royale","Support Increased Burning Damage","Support Increased Critical Damage","Support Increased Critical Strikes","Support Increased Critical Strikes Royale","Support Increased Duration","Support Increased Duration Royale","Support Increased Reservation Unique Experimentation","Support Intuitive Link","Support Iron Grip","Support Iron Will","Support Item Quantity","Support Item Rarity","Support Knockback","Support Knockback Royale","Support Lesser Multiple Projectiles","Support Lesser Multiple Projectiles Royale","Support Life Gain On Hit","Support Life Leech","Support Lifetap","Support Lifetap Royale","Support Lightning Penetration","Support Lightning Penetration Plus","Support Maim","Support Maim Royale","Support Mana Leech","Support Mark On Hit","Support Melee Damage On Full Life","Support Melee Physical Damage","Support Melee Physical Damage Plus","Support Melee Splash","Support Melee Splash Plus","Support Melee Splash Royale","Support Minefield","Support Minion Damage","Support Minion Damage Plus","Support Minion Defensive Stance","Support Minion Focus Fire","Support Minion Life","Support Minion Offensive Stance","Support Minion Speed","Support More Damage Assailum","Support More Damage Per Spells Cast Unique","Support Mortal Conviction","Support Multi Totem","Support Multi Totem Royale","Support Multi Trap","Support Multicast","Support Multicast Royale","Support Multistrike","Support Multistrike Plus","Support Multistrike Royale","Support Onslaught","Support Onslaught On Slaying Shocked Enemy","Support Parallel Projectiles","Support Parallel Projectiles Royale","Support Physical Damage To Add As Lightning Essence 1","Support Physical Projectile Attack Damage","Support Physical To Lightning","Support Pierce","Support Point Blank","Support Point Blank Royale","Support Power Charge On Crit","Support Projectile Intensity","Support Projectile Nova Unique","Support Projectile Spells Cooldown Unique","Support Projectile Spells Duration Unique","Support Pulverise","Support Puncturing Weapon","Support Rage","Support Rage Royale","Support Ranged Attack Totem","Support Ranged Attack Totem Royale","Support Rapid Activation","Support Rapid Decay","Support Reduced Duration","Support Reduced Duration Royale","Support Reduced Duration Unique","Support Reduced Mana","Support Reduced Mana Unique","Support Reduced Reservation Of Curses Unique","Support Reduced Reservation Unique Feast","Support Reduced Reservation Unique Prism Guardian","Support Reduced Reservation Unique Victarios Influence","Support Reflect Curses On Self Unique","Support Remote Mine","Support Remote Mine 2","Support Replicate","Support Return","Support Ruthless","Support Skitter Bot Ailment Aura Replace With Curse","Support Slashing Weapon","Support Slower Projectiles","Support Smoke Cloud Trap Unique","Support Spell Cascade","Support Spell Cascade Plus","Support Spell Cascade Royale","Support Spell Echo Plus","Support Spell Totem","Support Spell Totem Royale","Support Spells Additional Projectiles Unique","Support Spells Projectiles Nova Unique","Support Spellslinger","Support Spirit Strike","Support Spirit Strike Royale","Support Split","Support Storm Barrier","Support Stun","Support Stun Royale","Support Summon Elemental Resistances","Support Summon Ghost On Kill","Support Summon Ghost On Kill Royale","Support Summon Maximum Number Of Socketed Totems","Support Swift Affliction Plus","Support Trap","Support Trap And Mine Damage","Support Trap Cooldown","Support Trap Cooldown Royale","Support Trap Royale","Support Trigger Bow Skill On Bow Attack","Support Trigger Spell From Helmet","Support Trigger Spell On Attack","Support Trigger Spell On Bow Attack","Support Trigger Spell On Skill Use","Support Trinity","Support Tutorial","Support Unbound Ailments Plus","Support Unique Bow Minion Spells Cast On Kill","Support Unique Cast Curse On Curse","Support Unique Cospris Malice Cold Spells Cast On Melee Critical Strike","Support Unique Curse On Hit","Support Unique Mjolner Lightning Spells Cast On Hit","Support Unique Trigger Warcry From Endurance Charge Lost","Support Unleash Plus","Support Urgent Orders","Support Vicious Projectiles Plus","Support Void Manipulation","Support Void Manipulation Plus","Support Weapon Elemental Damage","Support Weapon Elemental Damage Plus","Supported Skills Apply Elemental Exposures On Hit","Sweep","Sweep Royale","Tempest Shield","Temporal Chains","Temporal Rift","Tentacle Smash","Thrown Shield","Thrown Shield Royale","Thrown Weapon","Thrown Weapon Royale","Tornado","Tornado Shot","Totem Melee","Totem Melee Royale","Touch Of God","Triggered Animate Weapon","Triggered Bone Nova","Triggered Consecrate","Triggered Explosion","Triggered Icicle Nova","Triggered Molten Strike","Triggered Shocked Ground","Triggered Summon Ghost On Kill","Triggered Summon Lesser Shrine","Triggered Summon Spider","Unhinge","Unique Animate Weapon","Unique Area Of Effect","Unique Elemental Equilibrium","Unique Enchantment Of Inferno On Crit","Unique Item Quantity","Unique Mirage Warriors","Unique Physical Added As Fire","Unique Secrets Of Suffering","Unique Support Cast On Shocked Kill","Unique Support Chain","Unique Support Flat Added Fire Damage","Unique Support Life Leech","Unique Support Local Golem Buff Effect","Unique Support Local Golem Grants Onslaught On Summon","Unique Support Local Golem Increased Attack And Cast Speed","Unique Support Local Golem Life Added As ES","Unique Support Local Golem Life Regeneration","Unique Support Local Golem Taunt On Hit","Unique Support Local Vaal Area Of Effect","Unique Support Local Vaal Aura Effect","Unique Support Local Vaal Chance To Refund Souls","Unique Support Local Vaal Damage","Unique Support Local Vaal Elusive On Use","Unique Support Local Vaal Ignore Monster Physical Reduction","Unique Support Local Vaal Ignore Monster Resistances","Unique Support Local Vaal Lucky Damage","Unique Support Local Vaal Projectile Speed","Unique Support Local Vaal Skill Effect Duration","Unique Support Local Vaal Soul Gain Prevention","Unique Support Local Vaal Soul Requirement","Unique Support Local Vaal Tailwind If Used Recently","Vaal Ancestral Warchief","Vaal Arc Chain","Vaal Aura Elemental Damage Healing","Vaal Blade Vortex","Vaal Blight","Vaal Breach","Vaal Burning Arrow","Vaal Clarity","Vaal Cold Snap","Vaal Cyclone","Vaal Detonate Dead","Vaal Discipline","Vaal Double Strike","Vaal Earthquake","Vaal Fire Trap","Vaal Fireball Spiral Nova","Vaal Flameblast","Vaal Flesh Offering","Vaal Glacial Hammer","Vaal Grace","Vaal Ground Slam","Vaal Haste","Vaal Heavy Strike","Vaal Ice Nova","Vaal Immortal Call","Vaal Lightning Strike","Vaal Lightning Trap","Vaal Lightning Warp Instant","Vaal Molten Shell","Vaal Power Siphon","Vaal Rain Of Arrows","Vaal Reave","Vaal Righteous Fire","Vaal Soul Harvesting","Vaal Spark Spiral Nova","Vaal Storm Call","Vaal Summon Skeletons","Vaal Sweep","Vaal Thrown Weapon","Vampiric Icon","Vampiric Link","Vengeance","Vicious Hex Explosion","Vicious Hex Explosion Royale","Vicious Hex Support","Vicious Hex Support Royale","Vigilant Strike","Viper Strike","Viper Strike Royale","Vitality","Vitality Royale","Void Gaze","Void Shot","Volatile Dead","Volatile Dead Chaos","Voltaxic Burst","Vortex Mine","Vulnerability","Vulnerability Royale","Wand Teleport","Warlords Mark","Warlords Mark Royale","Warlords Mark Triggered","Water Sphere","Water Sphere Royale","Whirling Blades","Whirling Blades Royale","Wild Strike","Wild Strike Royale","Wither","Wrath"];
  var DEBUG = false;
  
  var DELAY = 0;

  var fontsCSS = GM_getResourceText("fontsCSS");
  GM_addStyle (fontsCSS);
  GM_addStyle(`.gs-style-enabler .gs-frame,.gs-style-enabler .gs-style{background-color:#e8eff2;border:1px dashed #111;border-radius:5px;padding:5px}.gs-style-enabler .gs-style{background-color:#e8eff2;color:#222;padding:1px 2px}.gs-style-enabler .gs-style a{color:#09c;text-decoration:underline dashed}.gs-style-enabler .gs-style.gs-warning{color:#856404;background-color:#fff3cd;border-color:#856404}.gs-style-enabler .gs-style-light{font-size:.8em;font-style:italic;opacity:.9;background-color:#fff;line-height:1.2em}.gs-style-enabler .gs-style-light.gs-style{padding:1px 5px}.gs-style a,a.gs-style{cursor:pointer}.gs-style.gs-button{margin-right:5px;padding:2px 5px}body.frame-setting-frame{background-color:#e8eff2}.gs-clickable,a i.fas{cursor:pointer}.gs-frame{width:90%;min-height:300px;max-width:900px;height:85%;position:fixed;left:50%;transform:translateX(-50%);top:7.5%;z-index:100001}.gs-backdrop,.gs-framed-backdrop{width:100%;min-height:300px;height:100%;position:fixed;left:0;top:0;z-index:100000;background:rgba(255,255,255,.3)}.gs-framed-backdrop{z-index:100010;background:rgba(255,255,255,.7)}.hide{display:none}.nowrap{white-space:nowrap}.gs-pull-right{float:right}.gs-pull-left{float:left}.tippy-content a{color:#222}.patreon-button img{height:47px;border-radius:1.5rem}.paypal-form{padding-bottom:0;margin-bottom:-6px}#saved-alert{position:fixed;z-index:0;padding-left:0;padding-right:30px}.modal-dialog.modal-xl{max-width:90%}.gs-loading{width:300px;height:300px;position:fixed;left:50%;top:50%;z-index:100001;transform:translateX(-50%) translateY(-50%)}@-webkit-keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@-moz-keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}.gs-loading-spinner{width:30px;height:30px;position:fixed;left:135px;top:135px;z-index:100001;-webkit-animation-duration:.75s;-moz-animation-duration:.75s;animation-duration:.75s;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:rotate-forever;-moz-animation-name:rotate-forever;animation-name:rotate-forever;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;animation-timing-function:linear;border:8px solid #222;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;border-radius:50%;display:inline-block}.gs-loading-spinner.gs-loaded-half{border-right-color:#222}.gs-loading-spinner.gs-loaded-three-quarters{border-right-color:#222;border-bottom-color:#222}.gs-loading-spinner.gs-loaded-full{border-right-color:#222;border-bottom-color:#222;border-left-color:#222}.gs-loading-counter,.gs-loading-title{position:fixed;width:296px;padding:0 5px;text-align:center;font-weight:700;font-style:italic}.gs-loading-title{top:10px}.gs-loading-counter{bottom:10px}.gs-framed-style{color:#222;border:1px solid #000;border-radius:5px;background-color:#fff}.gs-framed-style.gs-loading{width:200px;height:200px}.gs-framed-style .gs-loading-spinner{left:85px;top:85px}.gs-framed-style .gs-loading-counter,.gs-framed-style .gs-loading-title{width:196px}.gs-framed-style .gs-loading-spinner{border-width:4px}.gs-removable:hover{text-decoration:line-through}.gs-badge-with-icon i{margin-left:4px}.gs-badge-with-icon:not(:hover) i.gs-clickable{color:#6c757d!important}.gs-bts-spinner{position:absolute;width:100%;top:50%;margin-left:-4em}.dropdown-menu.open{display:block}.form-select-xs~.select2-container--bootstrap-5 .select2-selection--multiple .select2-selection__rendered .select2-selection__choice{font-size:.675rem}.form-select-xs~.select2-container--bootstrap-5 .select2-selection{font-size:.675rem}.form-select-xs~.select2-container--bootstrap-5 .select2-selection--multiple .select2-selection__rendered .select2-selection__choice .select2-selection__choice__remove{width:.4rem;height:.4rem}.form-select-xs~.select2-container--bootstrap-5 .select2-selection__choice{height:min-content}.select2-selection__choice__display{white-space:nowrap}`);
  GM_addStyle(`body,html{height:100%}.currencyClicked{font-style:italic}.item .real-sort:hover{background:#000}.grouped-only,.proplist li.grouped-only{display:none}.grouped .grouped-only,.grouped .proplist li.grouped-only{display:inline}.marg-b-5{margin-bottom:5px}.marg-l-5{margin-left:5px}.marg-r-5{margin-right:5px}.marg-lr-8{margin-left:8px;margin-right:8px}.title a.gs-style{padding:3px 5px;font-size:12px;line-height:12px;top:-6px;position:relative}.chaosEquiv,.gs-item-handle{margin-left:5px;padding:1px 2px;border:1px solid #fff;border-radius:5px;white-space:nowrap}.grouped .resultset .row.gs-group-member{display:none}.gs-style-enabler .title a.gs-style{color:#222}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle,.gs-style-enabler .tippy-backdrop{background-color:#e8eff2;border:1px dashed #111;border-radius:5px}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle,.gs-style-enabler .tippy-content{background-color:#e8eff2;color:#222}.gs-style-enabler a.gs-style:focus,.gs-style-enabler a.gs-style:hover{color:#222}.gs-style-enabler .gs-style{padding:2px 5px}.gs-style-enabler .gs-style.wiki-link{padding:2px 9px}.gs-style-enabler .gs-framed-style,.gs-style-enabler .gs-style,.gs-style-enabler .tippy-content{font-family:Roboto,sans-serif}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle{font-family:Oswald,sans-serif}.gs-style-enabler .item .real-sort.gs-style:hover{color:#fff}.gs-style-enabler tr.cell-second td.gs-style,.gs-style-enabler tr.cell-second th.gs-style{background-color:#e8eff2}.gs-style-enabler tr.cell-second th.gs-style{border-bottom:none;border-bottom-left-radius:0;border-bottom-right-radius:0}.gs-style-enabler tr.cell-second td.gs-style{border-top:none;border-top-left-radius:0;border-top-right-radius:0}.gs-style-enabler .hide{display:none}.gs-style-enabler .nowrap{white-space:nowrap}.gs-style-enabler .tippy-content a{color:#222}.gs-style-enabler .form-group.disabled label{color:#6c757d}.gs-load.gs-style,.gs-map-selector.gs-style,.gs-multi.gs-style,.gs-offer-map-selector.gs-style,.gs-save.gs-style{margin-left:7px}.live-search-box.alert-box .gs-load.gs-style,.live-search-box.alert-box .gs-multi.gs-style,.live-search-box.alert-box .gs-save.gs-style{margin-left:0;margin-right:7px}.gs-save.gs-style{padding:0 7px}.gs-load.gs-style{padding:0 5px}.gs-multi.gs-style{padding:0 6px}.gs-map-selector.gs-style,.gs-offer-map-selector.gs-style{padding:0 7px}.tippy-content a{color:#fff}.currencySettings .itemSettingsOnly,.itemSettings .currencySettingsOnly{display:none}.curr-table img{height:22px}.poeOffSite .alert-box.live-search{margin:3px 8px;font-weight:700}.poeOffSite.gs-style-enabler #trade .gs-style a,.poeOffSite.gs-style-enabler #trade .gs-style-light a{color:#09c}.poeOffSite.gs-style-enabler .gs-style-light{font-size:.9em}.poeOffSite.gs-style-enabler div.gs-wrapper{line-height:32px}.poeOffSite.gs-style-enabler .input-group-btn .gs-style{font-size:10px;position:relative;top:4px;cursor:pointer}.poeOffSite.gs-search-tab .gs-multi.hide{display:inline!important}.poeOffSite.gs-exchange-tab .copied{font-style:italic}.poeOffSite.gs-exchange-tab .copied:after{content:' copied'}.poeOffSite #trade .results .search-bar .details .price .gs-wrapper img,.poeOffSite .results #trade .search-bar .details .price .gs-wrapper img,.poeOffSite .results .row .details .price .gs-wrapper img{width:22px;height:22px;vertical-align:sub}.poeOffSite .linkBack{min-width:359px}.poeOffSite .nav-tabs .pteSettings{height:32px;float:right}.poeOffSite .chaosEquiv,.poeOffSite .gs-item-handle{padding:3px 7px;cursor:pointer}.poeOffSite .tippy-content{font-size:1.6em}.poeOffSite .tippy-content .currency-image img{width:22px}.poeOffSite .gs-load.gs-style,.poeOffSite .gs-multi.gs-style,.poeOffSite .gs-save.gs-style{cursor:pointer}.poeOffSite .controls .gs-load,.poeOffSite .controls .gs-multi,.poeOffSite .controls .gs-save{margin-left:0;margin-right:5px}.poeOffSite #trade .controls.saveManager .controls-left{width:25%!important}.poeOffSite #trade .controls.saveManager .controls-right{width:45%!important}.poeOffSite #trade .controls.saveManager .controls-center{width:30%!important}@media (max-width:800px){.poeOffSite #trade .controls.saveManager .controls-left{width:50%!important}.poeOffSite #trade .controls.saveManager .controls-right{width:100%!important}.poeOffSite #trade .controls.saveManager .controls-center{width:50%!important}}.poeOffSite .gs-wikiLink{float:right;position:absolute}.alert-box.live-search{padding:3px 5px}#ms-console-tip{text-align:left}.gs-danger{color:#dc3545!important}.gs-info{color:#17a2b8!important}.gs-warning{color:#856404!important}.gs-success{color:#28a745!important}.gs-quote{color:#6c757d!important;font-style:italic}.middle-list{padding-top:90px;padding-bottom:90px}.frame-load-frame .fixed-bottom,.frame-load-frame .fixed-top,.frame-multi-frame .fixed-bottom,.frame-multi-frame .fixed-top{background:rgba(255,255,255,.95)}.frame-load-frame .table-responsive,.frame-multi-frame .table-responsive{overflow-x:visible}.frame-load-frame .table-responsive .col-md-1,.frame-multi-frame .table-responsive .col-md-1{width:8.33%}.frame-load-frame .table-responsive .col-md-2,.frame-multi-frame .table-responsive .col-md-2{width:16.66%}.frame-load-frame .table-responsive .col-md-3,.frame-multi-frame .table-responsive .col-md-3{width:25%}.frame-load-frame .table-responsive .col-md-4,.frame-multi-frame .table-responsive .col-md-4{width:33.33%}.frame-load-frame .table-responsive .col-md-5,.frame-multi-frame .table-responsive .col-md-5{width:41.66%}.frame-load-frame .table-responsive .col-md-6,.frame-multi-frame .table-responsive .col-md-6{width:50%}.frame-load-frame .table-responsive .col-md-7,.frame-multi-frame .table-responsive .col-md-7{width:58.33%}.frame-load-frame .table-responsive .col-md-8,.frame-multi-frame .table-responsive .col-md-8{width:66.66%}.frame-load-frame .table-responsive .col-md-9,.frame-multi-frame .table-responsive .col-md-9{width:75%}.frame-load-frame .table-responsive .col-md-10,.frame-multi-frame .table-responsive .col-md-10{width:83.33%}.frame-load-frame .table-responsive .col-md-11,.frame-multi-frame .table-responsive .col-md-11{width:91.66%}.poe1only,.poe2only{display:none}.poe1 .poe1only{display:initial}.poe2 .poe2only{display:initial}.gs-check-toggler .fa-check-square{display:none}.gs-check-toggler .fa-square{display:inline-block}.gs-check-toggler.gs-checked .fa-check-square{display:inline-block}.gs-check-toggler.gs-checked .fa-square{display:none}.gs-finder-results{min-height:100px;padding-top:11px}.gs-style-enabler #trade a.gs-style{background-color:#e8eff2;color:#222}.frame-mods-selector-frame .affixRow .affixTier,.frame-mods-selector-frame .tier-toggler .fa-caret-down{display:none}.frame-mods-selector-frame a.tier-toggler{text-decoration:none}.frame-mods-selector-frame .affixRow .affixTier{font-size:small}.frame-mods-selector-frame .affix.container{padding-left:0;padding-right:0}.frame-mods-selector-frame .affixName:hover,.frame-mods-selector-frame .affixTier:hover{background-color:rgba(0,0,0,.075)}.frame-mods-selector-frame .affixName.bg-info-subtle:hover,.frame-mods-selector-frame .affixTier.bg-info-subtle:hover{background-color:rgba(190,229,235,.5)}.frame-mods-selector-frame .affixTier{border-bottom:1px solid #ccc}.frame-mods-selector-frame .affixRow{border-bottom:1px solid #000}@media (min-width:768px){.frame-mods-selector-frame .middle-list{padding-top:124px;padding-bottom:60px}}.frame-mods-selector-frame .middle-list{padding-top:160px;padding-bottom:60px}.frame-mods-selector-frame .show-tiers .affixTier{display:flex}.frame-mods-selector-frame .show-tiers .affixTier.hide{display:none}.frame-mods-selector-frame .show-tiers .tier-toggler .fa-caret-down{display:block}.frame-mods-selector-frame .show-tiers .tier-toggler .fa-caret-right{display:none}.frame-mods-selector-frame .fixed-bottom,.frame-mods-selector-frame .fixed-top{background-color:rgba(255,255,255,.8)}.frame-mods-selector-frame .filterable .select2 .select2-selection{display:flex;height:62px;max-height:62px;overflow:hidden}.frame-mods-selector-frame .affix-counter{font-size:smaller;font-weight:400}.frame-mods-selector-frame .affix-counter::before{content:"("}.frame-mods-selector-frame .affix-counter::after{content:")"}`);
  GM_addStyle(`.colorPicker{width:16px;height:16px;position:relative;clear:both;margin:0}.colorPicker .track{background:#efefef url(https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/text-color.png) no-repeat 50% 50%;background-image:url(https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/text-color.png);height:150px;width:150px;padding:0;position:absolute;cursor:crosshair;float:left;left:-67px;top:-67px;display:none;border:1px solid #ccc;z-index:10;-webkit-border-radius:150px;-moz-border-radius:150px;border-radius:150px}.colorPicker .color{width:16px;height:16px;padding:0;border:1px solid #ccc;display:block;position:relative;z-index:11;background-color:#efefef;-webkit-border-radius:27px;-moz-border-radius:27px;border-radius:27px;cursor:pointer}.colorPicker .colorInner{width:14px;height:14px;-webkit-border-radius:27px;-moz-border-radius:27px;border-radius:27px}.colorPicker .dropdown{list-style:none;display:none;width:27px;position:absolute;top:28px;border:1px solid #ccc;left:0;z-index:1000}.colorPicker .dropdown li{height:25px;cursor:pointer}`);

  // GM_addStyle('table.masters img {width: 28px;}');

  var ITEM_SEARCH_CONTAINER = '#search-results-first', ITEM_SEARCH_SELECTOR = 'tbody.item', CURR_SEARCH_CONTAINER = '#content', CURR_SEARCH_SELECTOR = 'div.displayoffer';
var resources = [], cssUrls = ["https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css"], jsUrls = ["https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.2/bootstrap3-typeahead.min.js", "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"];
var settingsIcon = $(`<a class="gs-style gs-settings" data-tippy="POE Trade Enhancer settings">PTE <i class="fas fa-cog fa-spin"></i></a>`);

var addSettingsIconAndCommonInit = function(loc) {
  $('h3.title').prepend(settingsIcon);
  $(".large-12.columns small").filter(function() {
    return $(this).parents('#content').length === 0
  }).append("<span>|&nbsp;</span>");
  $(".large-12.columns small").filter(function() {
    return $(this).parents('#content').length === 0
  }).append(settingsIcon.clone());
  $('body').addClass('poeTradeSite');

  getAvailableLeagues();
};


var shortDescriptionParagraph = /* html */`
<p class="lead">
  <strong>Adds tons of usefull features to poe.trade, from a very easy to use save manager to save and laod your searches and even live search them all in one page, to an auto sort by real currency values (from poe.ninja), passing from gems max quality cost and more. I have some other very good idea for features to add, I'll gladly push them forward if I see people start using this.</strong>
  <br /><em><a href="https://github.com/ghostscript3r/poe-trade-enhancer">github page</a></em>
</p>
`

var roadmapParagraph = /* html */`
<div class="">
  <h3 class="">Roadmap</h3>
  <p class="lead">
    <p>I’m glad to see so many people interested in this script! While I’ve kept the <strong>feature voting system</strong> and <strong>GitHub issue tracking</strong>, I’ll be honest—I haven’t been great at keeping up with requests in the past, and with limited support, that’s unlikely to change.</p><p>For now, I’ll keep working on this at my own pace, mostly adding things I personally find useful. I have some cool ideas, but they’re probably a bit too ambitious for a one-person side project.</p><p>That said, if you have suggestions, feel free to drop them in! Just know that new features will happen <strong>if and when I have the time and motivation.</strong> Either way, I appreciate everyone who’s found this useful!</p>
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
    <a href="https://github.com/ghostscript3r/poe-trade-enhancer/issues" target="_blank">Issue tracking page</a><br />
    <em>Use only GitHub please. The other repositories section will be monitored occasionally at best. Also avoid sending bug report directly to my mail, there's a very high probability they'll just be ignored that way.</em>
  </p>
</div>
`

var changeLogParagraph = /* html */`
<div class="">
  <h3 class="">Changelog & Releases</h3>
  <p><a href="https://github.com/ghostscript3r/poe-trade-enhancer/releases" target="_blank">GitHub Changelog</a></p>
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
    <a href="https://github.com/ghostscript3r/poe-trade-enhancer" target="_blank">GitHub</a><br />
    <a href="https://greasyfork.org/scripts/387586-poe-trade-enhancer" target="_blank">GreasyFork</a><br />
    <a href="https://openuserjs.org/scripts/ghostscript3r/poe-trade-enhancer" target="_blank">OpenUserJS</a>
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
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css" crossorigin="anonymous" />
  <script>
    var fr = document.getElementById('settings-frame');
    var doc = document;
    if (fr) doc = fr.document || fr.contentDocument || fr.contentWindow.document;
    var scripts = [
      // "https://code.jquery.com/jquery-3.3.1.slim.min.js",
      "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
      "https://unpkg.com/tippy.js@3/dist/tippy.all.min.js"
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
        /*setTimeout(function(){
          console.log("END");
          console.log(window);
        }, 3000);*/
      }
    };
    loop();
  </script>
  <style>.gs-style-enabler .gs-frame,.gs-style-enabler .gs-style{background-color:#e8eff2;border:1px dashed #111;border-radius:5px;padding:5px}.gs-style-enabler .gs-style{background-color:#e8eff2;color:#222;padding:1px 2px}.gs-style-enabler .gs-style a{color:#09c;text-decoration:underline dashed}.gs-style-enabler .gs-style.gs-warning{color:#856404;background-color:#fff3cd;border-color:#856404}.gs-style-enabler .gs-style-light{font-size:.8em;font-style:italic;opacity:.9;background-color:#fff;line-height:1.2em}.gs-style-enabler .gs-style-light.gs-style{padding:1px 5px}.gs-style a,a.gs-style{cursor:pointer}.gs-style.gs-button{margin-right:5px;padding:2px 5px}body.frame-setting-frame{background-color:#e8eff2}.gs-clickable,a i.fas{cursor:pointer}.gs-frame{width:90%;min-height:300px;max-width:900px;height:85%;position:fixed;left:50%;transform:translateX(-50%);top:7.5%;z-index:100001}.gs-backdrop,.gs-framed-backdrop{width:100%;min-height:300px;height:100%;position:fixed;left:0;top:0;z-index:100000;background:rgba(255,255,255,.3)}.gs-framed-backdrop{z-index:100010;background:rgba(255,255,255,.7)}.hide{display:none}.nowrap{white-space:nowrap}.gs-pull-right{float:right}.gs-pull-left{float:left}.tippy-content a{color:#222}.patreon-button img{height:47px;border-radius:1.5rem}.paypal-form{padding-bottom:0;margin-bottom:-6px}#saved-alert{position:fixed;z-index:0;padding-left:0;padding-right:30px}.modal-dialog.modal-xl{max-width:90%}.gs-loading{width:300px;height:300px;position:fixed;left:50%;top:50%;z-index:100001;transform:translateX(-50%) translateY(-50%)}@-webkit-keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@-moz-keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}.gs-loading-spinner{width:30px;height:30px;position:fixed;left:135px;top:135px;z-index:100001;-webkit-animation-duration:.75s;-moz-animation-duration:.75s;animation-duration:.75s;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:rotate-forever;-moz-animation-name:rotate-forever;animation-name:rotate-forever;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;animation-timing-function:linear;border:8px solid #222;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;border-radius:50%;display:inline-block}.gs-loading-spinner.gs-loaded-half{border-right-color:#222}.gs-loading-spinner.gs-loaded-three-quarters{border-right-color:#222;border-bottom-color:#222}.gs-loading-spinner.gs-loaded-full{border-right-color:#222;border-bottom-color:#222;border-left-color:#222}.gs-loading-counter,.gs-loading-title{position:fixed;width:296px;padding:0 5px;text-align:center;font-weight:700;font-style:italic}.gs-loading-title{top:10px}.gs-loading-counter{bottom:10px}.gs-framed-style{color:#222;border:1px solid #000;border-radius:5px;background-color:#fff}.gs-framed-style.gs-loading{width:200px;height:200px}.gs-framed-style .gs-loading-spinner{left:85px;top:85px}.gs-framed-style .gs-loading-counter,.gs-framed-style .gs-loading-title{width:196px}.gs-framed-style .gs-loading-spinner{border-width:4px}.gs-removable:hover{text-decoration:line-through}.gs-badge-with-icon i{margin-left:4px}.gs-badge-with-icon:not(:hover) i.gs-clickable{color:#6c757d!important}.gs-bts-spinner{position:absolute;width:100%;top:50%;margin-left:-4em}.dropdown-menu.open{display:block}.form-select-xs~.select2-container--bootstrap-5 .select2-selection--multiple .select2-selection__rendered .select2-selection__choice{font-size:.675rem}.form-select-xs~.select2-container--bootstrap-5 .select2-selection{font-size:.675rem}.form-select-xs~.select2-container--bootstrap-5 .select2-selection--multiple .select2-selection__rendered .select2-selection__choice .select2-selection__choice__remove{width:.4rem;height:.4rem}.form-select-xs~.select2-container--bootstrap-5 .select2-selection__choice{height:min-content}.select2-selection__choice__display{white-space:nowrap}</style>
  <style>body,html{height:100%}.currencyClicked{font-style:italic}.item .real-sort:hover{background:#000}.grouped-only,.proplist li.grouped-only{display:none}.grouped .grouped-only,.grouped .proplist li.grouped-only{display:inline}.marg-b-5{margin-bottom:5px}.marg-l-5{margin-left:5px}.marg-r-5{margin-right:5px}.marg-lr-8{margin-left:8px;margin-right:8px}.title a.gs-style{padding:3px 5px;font-size:12px;line-height:12px;top:-6px;position:relative}.chaosEquiv,.gs-item-handle{margin-left:5px;padding:1px 2px;border:1px solid #fff;border-radius:5px;white-space:nowrap}.grouped .resultset .row.gs-group-member{display:none}.gs-style-enabler .title a.gs-style{color:#222}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle,.gs-style-enabler .tippy-backdrop{background-color:#e8eff2;border:1px dashed #111;border-radius:5px}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle,.gs-style-enabler .tippy-content{background-color:#e8eff2;color:#222}.gs-style-enabler a.gs-style:focus,.gs-style-enabler a.gs-style:hover{color:#222}.gs-style-enabler .gs-style{padding:2px 5px}.gs-style-enabler .gs-style.wiki-link{padding:2px 9px}.gs-style-enabler .gs-framed-style,.gs-style-enabler .gs-style,.gs-style-enabler .tippy-content{font-family:Roboto,sans-serif}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle{font-family:Oswald,sans-serif}.gs-style-enabler .item .real-sort.gs-style:hover{color:#fff}.gs-style-enabler tr.cell-second td.gs-style,.gs-style-enabler tr.cell-second th.gs-style{background-color:#e8eff2}.gs-style-enabler tr.cell-second th.gs-style{border-bottom:none;border-bottom-left-radius:0;border-bottom-right-radius:0}.gs-style-enabler tr.cell-second td.gs-style{border-top:none;border-top-left-radius:0;border-top-right-radius:0}.gs-style-enabler .hide{display:none}.gs-style-enabler .nowrap{white-space:nowrap}.gs-style-enabler .tippy-content a{color:#222}.gs-style-enabler .form-group.disabled label{color:#6c757d}.gs-load.gs-style,.gs-map-selector.gs-style,.gs-multi.gs-style,.gs-offer-map-selector.gs-style,.gs-save.gs-style{margin-left:7px}.live-search-box.alert-box .gs-load.gs-style,.live-search-box.alert-box .gs-multi.gs-style,.live-search-box.alert-box .gs-save.gs-style{margin-left:0;margin-right:7px}.gs-save.gs-style{padding:0 7px}.gs-load.gs-style{padding:0 5px}.gs-multi.gs-style{padding:0 6px}.gs-map-selector.gs-style,.gs-offer-map-selector.gs-style{padding:0 7px}.tippy-content a{color:#fff}.currencySettings .itemSettingsOnly,.itemSettings .currencySettingsOnly{display:none}.curr-table img{height:22px}.poeOffSite .alert-box.live-search{margin:3px 8px;font-weight:700}.poeOffSite.gs-style-enabler #trade .gs-style a,.poeOffSite.gs-style-enabler #trade .gs-style-light a{color:#09c}.poeOffSite.gs-style-enabler .gs-style-light{font-size:.9em}.poeOffSite.gs-style-enabler div.gs-wrapper{line-height:32px}.poeOffSite.gs-style-enabler .input-group-btn .gs-style{font-size:10px;position:relative;top:4px;cursor:pointer}.poeOffSite.gs-search-tab .gs-multi.hide{display:inline!important}.poeOffSite.gs-exchange-tab .copied{font-style:italic}.poeOffSite.gs-exchange-tab .copied:after{content:' copied'}.poeOffSite #trade .results .search-bar .details .price .gs-wrapper img,.poeOffSite .results #trade .search-bar .details .price .gs-wrapper img,.poeOffSite .results .row .details .price .gs-wrapper img{width:22px;height:22px;vertical-align:sub}.poeOffSite .linkBack{min-width:359px}.poeOffSite .nav-tabs .pteSettings{height:32px;float:right}.poeOffSite .chaosEquiv,.poeOffSite .gs-item-handle{padding:3px 7px;cursor:pointer}.poeOffSite .tippy-content{font-size:1.6em}.poeOffSite .tippy-content .currency-image img{width:22px}.poeOffSite .gs-load.gs-style,.poeOffSite .gs-multi.gs-style,.poeOffSite .gs-save.gs-style{cursor:pointer}.poeOffSite .controls .gs-load,.poeOffSite .controls .gs-multi,.poeOffSite .controls .gs-save{margin-left:0;margin-right:5px}.poeOffSite #trade .controls.saveManager .controls-left{width:25%!important}.poeOffSite #trade .controls.saveManager .controls-right{width:45%!important}.poeOffSite #trade .controls.saveManager .controls-center{width:30%!important}@media (max-width:800px){.poeOffSite #trade .controls.saveManager .controls-left{width:50%!important}.poeOffSite #trade .controls.saveManager .controls-right{width:100%!important}.poeOffSite #trade .controls.saveManager .controls-center{width:50%!important}}.poeOffSite .gs-wikiLink{float:right;position:absolute}.alert-box.live-search{padding:3px 5px}#ms-console-tip{text-align:left}.gs-danger{color:#dc3545!important}.gs-info{color:#17a2b8!important}.gs-warning{color:#856404!important}.gs-success{color:#28a745!important}.gs-quote{color:#6c757d!important;font-style:italic}.middle-list{padding-top:90px;padding-bottom:90px}.frame-load-frame .fixed-bottom,.frame-load-frame .fixed-top,.frame-multi-frame .fixed-bottom,.frame-multi-frame .fixed-top{background:rgba(255,255,255,.95)}.frame-load-frame .table-responsive,.frame-multi-frame .table-responsive{overflow-x:visible}.frame-load-frame .table-responsive .col-md-1,.frame-multi-frame .table-responsive .col-md-1{width:8.33%}.frame-load-frame .table-responsive .col-md-2,.frame-multi-frame .table-responsive .col-md-2{width:16.66%}.frame-load-frame .table-responsive .col-md-3,.frame-multi-frame .table-responsive .col-md-3{width:25%}.frame-load-frame .table-responsive .col-md-4,.frame-multi-frame .table-responsive .col-md-4{width:33.33%}.frame-load-frame .table-responsive .col-md-5,.frame-multi-frame .table-responsive .col-md-5{width:41.66%}.frame-load-frame .table-responsive .col-md-6,.frame-multi-frame .table-responsive .col-md-6{width:50%}.frame-load-frame .table-responsive .col-md-7,.frame-multi-frame .table-responsive .col-md-7{width:58.33%}.frame-load-frame .table-responsive .col-md-8,.frame-multi-frame .table-responsive .col-md-8{width:66.66%}.frame-load-frame .table-responsive .col-md-9,.frame-multi-frame .table-responsive .col-md-9{width:75%}.frame-load-frame .table-responsive .col-md-10,.frame-multi-frame .table-responsive .col-md-10{width:83.33%}.frame-load-frame .table-responsive .col-md-11,.frame-multi-frame .table-responsive .col-md-11{width:91.66%}.poe1only,.poe2only{display:none}.poe1 .poe1only{display:initial}.poe2 .poe2only{display:initial}.gs-check-toggler .fa-check-square{display:none}.gs-check-toggler .fa-square{display:inline-block}.gs-check-toggler.gs-checked .fa-check-square{display:inline-block}.gs-check-toggler.gs-checked .fa-square{display:none}.gs-finder-results{min-height:100px;padding-top:11px}.gs-style-enabler #trade a.gs-style{background-color:#e8eff2;color:#222}.frame-mods-selector-frame .affixRow .affixTier,.frame-mods-selector-frame .tier-toggler .fa-caret-down{display:none}.frame-mods-selector-frame a.tier-toggler{text-decoration:none}.frame-mods-selector-frame .affixRow .affixTier{font-size:small}.frame-mods-selector-frame .affix.container{padding-left:0;padding-right:0}.frame-mods-selector-frame .affixName:hover,.frame-mods-selector-frame .affixTier:hover{background-color:rgba(0,0,0,.075)}.frame-mods-selector-frame .affixName.bg-info-subtle:hover,.frame-mods-selector-frame .affixTier.bg-info-subtle:hover{background-color:rgba(190,229,235,.5)}.frame-mods-selector-frame .affixTier{border-bottom:1px solid #ccc}.frame-mods-selector-frame .affixRow{border-bottom:1px solid #000}@media (min-width:768px){.frame-mods-selector-frame .middle-list{padding-top:124px;padding-bottom:60px}}.frame-mods-selector-frame .middle-list{padding-top:160px;padding-bottom:60px}.frame-mods-selector-frame .show-tiers .affixTier{display:flex}.frame-mods-selector-frame .show-tiers .affixTier.hide{display:none}.frame-mods-selector-frame .show-tiers .tier-toggler .fa-caret-down{display:block}.frame-mods-selector-frame .show-tiers .tier-toggler .fa-caret-right{display:none}.frame-mods-selector-frame .fixed-bottom,.frame-mods-selector-frame .fixed-top{background-color:rgba(255,255,255,.8)}.frame-mods-selector-frame .filterable .select2 .select2-selection{display:flex;height:62px;max-height:62px;overflow:hidden}.frame-mods-selector-frame .affix-counter{font-size:smaller;font-weight:400}.frame-mods-selector-frame .affix-counter::before{content:"("}.frame-mods-selector-frame .affix-counter::after{content:")"}</style>
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
      <a class="navbar-brand" href onclick="return false;">Poe Trade Enhancer</a>
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
          <h2 class="">Poe Trade Enhancer <small class="text-secondary font-italic font-weight-light">v. 1.4.1007</small></h2>
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
  parag1: {title: 'Item Search', featureTitle: 'Item Search enhancements', class: 'itemSettingsOnly'},
  parag2: {title: 'Currency Search', featureTitle: 'Currency Search enhancements', class: 'currencySettingsOnly'}
}

var settings = {
  loadImmediately: {
    type: 'Boolean', default: true,
    label:`Load immediately`, info:`If this is checked all resources will be loaded as soon as possible. This might make the page feel "slow", especially if the original site is already loading a lot of resources and scripts. If this is not checked resources will be loaded only when everything else is ready, one at a time and only if necessary. This way it will be few seconds more before you can interact with this userscript features, but the general startup of the application should feel smoother.`
  },
  useGSStyle: {
    type: 'Boolean', default: true,
    label:`Use GhostScripter style`, info:`If this is checked features added by this UserScript will standout so it's very clear what is added and what comes from the original site.`,
    nofeature:`Two styles available, one that blends as much as possible with the original site, the other which makes added feature stand out as much as possible.`
  },
  useSaveManager: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: 'itemSettingsOnly',
    label: `Enable save manager`, info:`Enabling this you'll be able to save and load searches.`,
    feature: `Adds a save manager to easily save and reload any item search.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/save-man.gif'
  },
  multiLiveSearch: {
    paragraph: 'parag1', class: 'itemSettingsOnly',
    feature: `Multi live-search. You can live-search any number of your saved searches in one page.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/multi-live.gif'
  },
  enableChaosEquiv: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: 'itemSettingsOnly',
    label:`Convert all prices to chaos equivalent`, info:`If you disable this all PTE conversion related features will be disabled.`,
    feature:`Sort item and currency searches on <b>poe.trade</b> by current chaos equivalent using <b>poe.ninja</b> values.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/sort-real-curr.gif'
  },
  enableCurrencyLoad: {
    type: 'Boolean', default: true, paragraph: 'parag1', parent: 'enableChaosEquiv',
    label:`Load currency values from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b>`, info:`If you disable this PTE will use preloaded values corresponding to Standard league values at the moment of the last major release.`
  },
  currencyMaxAge: {
    type: 'Number', min: 0, max: 12, default: 6, parent: 'enableCurrencyLoad', paragraph: 'parag1', renderer: 'bar',
    label:`Max age for currency values: <b><span id="currencyMaxAge-val"></span> hr</b>`, info:`Maximum hours for which consider valide the currency values from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b>. After that time they will be loaded again at first load. If set to zero they will never be loaded again and must be refreshed manually from Currency tab.`
  },
  autoSortByRealCurrency: {
    type: 'Boolean', default: false, paragraph: 'parag1', parent: 'enableCurrencyLoad',
    label:`Auto sort by real currency value`, info:`If you enable this both item and currency searches will be sorted automatically after load by real currency values, from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b> or manually modified.`
  },
  enableCopyForPoB: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: 'itemSettingsOnly',
    label: `Show copy for Path of Building button`, info:`Copies to clipboard a representation of the item ready to be imported in PoB.`,
    feature: `"Copy for Path of Building" button on every item result.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/copy-for-pob.gif'
  },
  enableGroupedResults: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: 'itemSettingsOnly',
    label: `Enable grouping of results by same seller`, info:``,
    feature: `Result can be grouped by user selling`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/group-same-user.gif'
  },
  autoGroupSameUser: {
    type: 'Boolean', default: false, paragraph: 'parag1', parent: 'enableGroupedResults', class: 'itemSettingsOnly',
    label:`Auto group results from the same user`, info:`If you enable this item search results will automatically be grouped by user and also sorted by average real currency value (from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b>) and quantity of items beeing sold. Usefull for maps and other "consumables", not for equipment search (but you can always ungoup results when needed).`
  },
  showGroupButtonOnZeroMoreFromSameUser: {
    type: 'Boolean', default: false, paragraph: 'parag1', parent: 'enableGroupedResults', class: 'itemSettingsOnly',
    label:`Show group by user button on all items`, info:`If you enable this the button that let you group results from the same user will be visible even on items that have no other items to group.`
  },
  enableMaxNormCost: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: 'itemSettingsOnly',
    label: `Show max tier normalized cost`, info:`If you enable this it will be shown the cost of max tier item for items with clear vendor recipes (essences and sextant).`,
    feature: `For tiered items (essences, sextants...) show the cost of reaching max tier, also enabling sorting by this value.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/max-tier.gif'
  },
  enableMaxQtCost: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: 'itemSettingsOnly',
    label: `Show max quality normalized cost for gems`, info:`If you enable this for gems it will be shown the total cost to buy the gem and bring it to max quality using actual gemcutter's cost.`,
    feature: `For gems show the cost of reaching max quality by buying the gem and the necessary gemcutter's prisms, also enabling sorting by this value.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/max-qt.gif'
  },
  addWikiLinks: {
    paragraph: 'parag1', class: 'itemSettingsOnly',
    feature: `Wiki links for additional items and types.`
  },
  addChaosEquivOnCurrencySearches: {
    type: 'Boolean', default: true, paragraph: 'parag2', class: 'currencySettingsOnly',
    label: `Convert all prices to chaos equivalent`, info:`If you disable this all PTE conversion related features will be disabled, like sorting.`
  },
  trackContactedOnCurrencySearches: {
    type: 'Boolean', default: true, paragraph: 'parag2', class: 'currencySettingsOnly',
    label:`Track "contacted" also in currency searches`, info:`Track already contacted seller like for item searches.`,
    feature:`Track "contacted" seller in currency searches like the app already does for item searches.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/contacted.gif'
  },
  customQuantitiesOnCurrencySearches: {
    type: 'Boolean', default: true, paragraph: 'parag2', class: 'currencySettingsOnly',
    label:`Change quantities freely`, info:`Enabling this you'll be able to manually change quantities as you wish. Just click on the quantity you want to change (buying/selling) and the other will be recalculated using the same ratio.`,
    feature:`Change quantities in currency searches freely.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/change-qt.gif'
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
var trace = function(){}, debug = function(){}, info = function(){}, warn = function(){}, log = function(){};
var setupDebugger = function(level) {
  if (level) {
    var lc = _.lowerCase(level)
    if (lc == "trace") trace = console.debug.bind(window.console);
    else trace = function(){};
    if (level === true || lc == "trace" || lc == "debug") debug = console.debug.bind(window.console)
    else debug = function(){};
    if (level === true || lc == "trace" || lc == "debug" || lc == "info") info = console.info.bind(window.console)
    else info = function(){};
    if (level === true || lc == "trace" || lc == "debug" || lc == "info" || lc == "log") log = console.log.bind(window.console)
    else log = function(){};
    if (level === true || lc == "trace" || lc == "debug" || lc == "info" || lc == "log" || lc == "warn") warn = console.warn.bind(window.console)
    else warn = function(){};
  } else {
    debug = function(){}, info = function(){}, log = function(){}, warn = function(){};
  }
};
setupDebugger(DEBUG);

function mapRec(el, fn, name, filterFn) {
  if (!name) name = "ROOT";
  if (Array.isArray(el))
    return el.map(function(v, i) { mapRec(v, fn, `${name}[${i}]`, filterFn) });
  if (el && typeof el === 'object')
    return Object.fromEntries(Object.entries(el).map(([k, v]) => [k, (filterFn(v, k, el, name)) ? mapRec(v, fn, `${name}.${k}`, filterFn) : v]));
  return fn(el, name);
}

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

var openFrame = function(id, handle, data) {
  if ($(`#${id}`).length == 0 && frameBuilders[id]) {
    buildIframe(frameBuilders[id], function() {
      jQuery.event.trigger(`${id}-frame-open`, [handle]);
      $(`#${id},.${id}-backdrop`).removeClass("hide");
    }, data);
  } else {
    if (data) {
      $(`#${id}`).data(data);
    }
    jQuery.event.trigger(`${id}-frame-open`, [handle]);
    $(`#${id},.${id}-backdrop`).removeClass("hide");
  }
};

var closeFrame = function(id) {
  jQuery.event.trigger(`${id}-frame-close`, []);
  $(`#${id},.${id}-backdrop`).addClass("hide");
};

var buildIframe = function(options, callback, data) {
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
    if (options.onOpen) {
      $(document).on(`${options.id}-frame-open`, options.onOpen);
    }
    if (options.onClose) {
      $(document).on(`${options.id}-frame-close`, options.onClose);
    }

    iframe.one('load',function(){
      var iframeDoc = $(this).contents();
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
      var scripts = [];

      var loop = function(index, cb) {
        if (index < scripts.length) {
          var script = scripts[index];
          script.onload = function () {
            console.log("Script caricato:", this.src);
            loop(index+1, cb);
          };
          iframeDoc[0].body.appendChild(script);
        } else {
          cb();
        }
      };

      iframeDoc.find("script").each(function () {
          var script = document.createElement("script");
          script.type = "text/javascript";

          if (this.src) {
              script.src = this.src; // Per script esterni
          } else {
              script.textContent = this.text || this.innerText; // Per script inline
          }

          scripts.push(script);
      });
      loop(0, function() {
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
    });
    $('body').prepend(backdrop).prepend(iframe);
    if (data) {
      $(`#${options.id}`).data(data);
    }
  }, 100);
};

var addIframe = function(options, callback) {
  debug($(options.trigger), "iframe trigger");
  if (options.trigger) addIframeTrigger(options.trigger, options.id);
  if (getSetting("loadImmediately")) {
    buildIframe(options, callback);
  } else {
    frameBuilders[options.id] = options;
    if (callback) callback();
  }
};

var addIframeTrigger = function(trigger, id) {
  if (!$(trigger).data('opens-'+id)) {
    $(trigger).on( "click", function() {
      var _this = $(this);
      debug(`opening frame ${id}`);
      openFrame(id, _this);
    });
    $(trigger).data('opens-'+id, true);
  }
};

var insertOnParagraph = function(iframe, element, paragraph, prefix, elType, parent) {
  var before = null;
  if (paragraph) {
    before = iframe[0].contentWindow.$(prefix+paragraph+' ~ '+elType+':first');
  } else {
    before = iframe[0].contentWindow.$(prefix+'ungrouped ~ '+elType+':first');
  }
  if (before && before.length) {
    before.before(element);
  } else {
    iframe[0].contentWindow.$(parent).append(element);
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
        <input type="number" class="ms-2" min="${set.min}" max="${set.max}" id="${key}">
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
  var globs, options = {tick: 100, max: -1, count: 0}, callback, stop = false, error = false;
  trace(`waitFor arguments:`, arguments);
  if (arguments.length >= 2) {
    globs = arguments[0];
    callback = arguments[1];
    if (arguments.length == 3) {
      callback = arguments[2];
      options = $.extend({}, options, arguments[1]);
    }
    trace(`waitFor options:`, options);
    try {
      options.count++;
      if (!options.started) {
        options.started = moment().valueOf();
      } else if (options.max > 0 && moment.duration(moment().diff(options.started)).asMilliseconds() >= options.max) {
        stop = true;
        error = new Error("waitFor timeout reached");
      }
    } catch(ex) {
      trace(`waitFor maxAge check exception: ${ex}`);
    }
    try {
      _.each(_.flatten([globs]), function(g) {
        trace(`eval => ${g}`);
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
      trace(`waitFor eval exception: ${ex}`);
    }
    if (stop) {
      if (error && options.onFailure) {
        warn(`waitFor FAILED`);
        options.onFailure(error);
      } else {
        debug(`waitFor found everything`);
        callback();
      }
    } else {
      if (options.count % 10 == 0) debug(`waitFor didn't find, retrying next tick`);
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
  _this.stoppable = (options.stoppable != undefined) ? options.stoppable : true;
  _this.overlayId = options.overlayId || "gs-modal-loading-backdrop";
  _this.backdropClass = options.backdropClass || "gs-backdrop";
  _this.styleClass = options.styleClass || "gs-style";
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
    // $('.gs-loading-spinner').animate({width: 30}, 'slow');
  };
  _this.start = function() {
    var overlay = $(`#${_this.overlayId}`);
    if (overlay.length === 0) {
      overlay = $(`<div id="${_this.overlayId}" class="${_this.backdropClass} hide"><div id="gs-modal-loading" class="${_this.styleClass} gs-loading"><div id="gs-modal-loading-title" class="gs-loading-title"></div><div id="gs-modal-loading-spinner" class="gs-loading-spinner"></div><div id="gs-modal-loading-counter" class="gs-loading-counter"></div></div></div>`);
      if (_this.stoppable) {
        overlay.on('click',_this.stop);
      }
      $('body').append(overlay);
    }
    _this.write();
    overlay.removeClass("hide");
  }
  _this.stop = function() {
    $(`#${_this.overlayId}`).addClass("hide");
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

var cartesianProduct = function(array) {
  return array.reduce(function(a, b) {
    return a.map(function (x) {return b.map(function (y) {return x.concat(y)})})
    .reduce(function(a, b) {return a.concat(b)}, [])
  }, [[]]);
};

var toElementId = function(str) {
  return str.replaceAll(/[\s\.']/gi,"-")
  .replaceAll(/#/gi,"HASH")
  .replaceAll(/&/gi,"AMP")
  .replaceAll(/\|\|\|\|\|/gi,"CRLN")
  .replaceAll(/%/gi,"PERC");
}

var isNumber = function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

var getAttributeValueByType = function(el, attr) {
  var type = el.getAttribute(attr+"-type") || "";
  switch (type.toLowerCase()) {
  case "int":
      return parseInt(el.getAttribute(attr));
      break;
  case "number":
  case "float":
      return parseFloat(el.getAttribute(attr));
      break;
  default:
      return el.getAttribute(attr);
      break;
  }
};

var sortMeBy = function(arg, sel, elem, order, jq) {
  if (!jq) jq = $;
  trace("sortMeBy: "+sel);
  var $selector = jq(sel),
  $element = $selector.children(elem);
  $element.sort(function(a, b) {
    var an = getAttributeValueByType(a, arg),
    bn = getAttributeValueByType(b, arg);
    trace(`sortMeBy elements: ${an} - ${bn}`);
    if (order == "asc") {
      if (an > bn)
        return 1;
      if (an < bn)
        return -1;
    } else if (order == "desc") {
      if (an < bn)
        return 1;
      if (an > bn)
        return -1;
    }
    return 0;
  });
  $element.detach().appendTo($selector);
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
    trace(key+" already loaded with value: "+settings[key].value);
    return settings[key].value;
  } else {
    trace(`about tp get ${namespace+"."+key} from localStorage`);
    var val = localStorage.getItem(namespace+"."+key);
    trace(`got ${namespace+"."+key} from localStorage: ${val}`);
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
    trace(key+" loaded from localStorage: "+settings[key].value);
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
      iframe[0].contentWindow.$('#saved-alert').stop().removeClass('d-none').css({'opacity':1, 'z-index': 1000}).animate({'opacity': 0, 'z-index': 0}, 3000, function () {
        iframe[0].contentWindow.$('#saved-alert').addClass('d-none');
      });
    };
    iframe[0].contentWindow.$('body').addClass(((poe2) ? 'poe2' : 'poe1'));
    var setDisabler = function() {
      $.each( settings, function( key, set ) {
        var setter = iframe[0].contentWindow.$('#'+key);
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
        iframe[0].contentWindow.$('#settings-form').append(`<hr class="${par.class}">`).append(`<h4 id="sett-${key}" class="${par.class}">${par.title}</h4>`);
      }
      if (par.featureTitle) {
        iframe[0].contentWindow.$('#features-list').append(`<dt id="feature-${key}" class="${par.class}">${par.featureTitle}</dt>`);
      }
    });
    iframe[0].contentWindow.$('#features-list').prepend(`<dt id="feature-ungrouped" class="mt-3 mb-2 border-top border-secondary d-none"></dt>`);
    iframe[0].contentWindow.$('#settings-form').prepend(`<h4 id="sett-ungrouped" class=""></h4>`);

    $.each( settings, function( key, set ) {
      debug( key + ": " + set );
      if (set.feature) {
        var dd = $(`<dd class="${set.class}">${set.feature}</dd>`);
        if (set.showcase) {
          var scIcon = $(`<a class="ms-2" title="Showcase this feature"><i class="fas fa-film"></i></a>`);
          dd.append(scIcon);
          scIcon.on( "click", function(e) {
            iframe[0].contentWindow.$('#showcaseModal .modal-body').empty().append(`<img class="img-fluid" alt="${set.feature} Showcase" src="${set.showcase}" />`);
            iframe[0].contentWindow.$('#showcaseModal').modal('show');
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
      var setter = iframe[0].contentWindow.$('#'+key);
      var valuer = iframe[0].contentWindow.$('#'+key+"-val");
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


info("version: 1.4.1007");

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


  //function override
$.fn.old_data = $.fn.data;
$.fn.data = function () {
    var result = this.old_data.apply(this, arguments);
    if (arguments[0]) {
      this.attr("data-"+_.kebabCase(arguments[0]), arguments[1]);
    }
    return result;
};

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

function copyToClipboard(text) {
  fallbackCopyTextToClipboard(text);
};

function getPriceSpan(buyout, noTooltip) {
  var b = separateBuyout(buyout);
  if (b) {
    if (noTooltip) {
      return '<span class=""><span class="currency currency-'+b[1]+'" title="">'+b[0]+'×</span></span>';
    } else {
      return '<span class="" data-name="price_in_chaos_new"><span data-tooltip="" class="has-tip currency currency-'+b[1]+'" data-selector="tooltip0zrbgd" title="">'+b[0]+'×</span></span>';
    }
  } else {
    return buyout;
  }
}

var addResultMessage = function(containerSelector, messageElement, msgClass, builder) {
  if (messageElement && $(containerSelector+' .'+msgClass).length === 0) {
    var div = $(`<div class="gs-style gs-style-light marg-b-5 ${msgClass}"></div>`);
    $(containerSelector).before(div);
    div.append(messageElement);
    if (builder) {
      builder(div);
    }
  }
}

var fixTabs = function(iframe, nav, container) {
  debug(iframe[0].contentWindow.$(nav + ' a.nav-link'));
  iframe[0].contentWindow.$(nav + ' a.nav-link').on('click', function(e) {
    var id = $(this).attr('id');
    var panel = $(this).attr('href');
    iframe[0].contentWindow.$('#'+id).tab("show");
    iframe[0].contentWindow.$(container + ' .tab-pane.show').removeClass("show active");
    iframe[0].contentWindow.$(panel).addClass("show active");
  });
};

//fix old jQuery
$(document).on(`setting-frame-frame-created`, function(e, iframe) {
  fixTabs(iframe, "#myTab", "#myTabContent");

  iframe[0].contentWindow.$('#currency-tab').on('click', function (e) {
    initCurrencyTables(iframe);
    fixTabs(iframe, "#myCurrTab", "#myCurrTabContent");
  });

});

function getCurrentLeague() {
  return $("#search .league").val();
}

function getAvailableLeagues() {
  leagues = [];
  $(`#search .league option`).each(function( index ) {
    leagues.push($( this ).val());
  });
};

function addChaosEquiv(item, doSort) {
  var sortHandle, itemSelector, containerSelector, ascending = ASC, sortKey = "chaosEquivalent";
  if (item.hasClass('displayoffer')) {
    containerSelector = CURR_SEARCH_CONTAINER;
    itemSelector = CURR_SEARCH_SELECTOR;
    ascending = ASC;
    sortKey = "chaosEquivalentEach";
    // TIP: sellcurrency and sellvalue => what you pay
    // TIP: buycurrency and buyvalue => what you get
    var dt = item.data();
    var buyout = convertBuyout(dt.buyvalue + " " + CURRENCY_TEXTS[dt.buycurrency]);
    var cada = buyout / Number(dt.sellvalue);
    var tot = convertBuyout(dt.sellvalue + " " + CURRENCY_TEXTS[dt.sellcurrency]) - buyout;
    var chaosEquivalent = tot;
    // debug(`${dt.buyvalue} ${CURRENCY_TEXTS[dt.buycurrency]} = ${convertBuyout(dt.buyvalue + " " + CURRENCY_TEXTS[dt.buycurrency])} chaos`);
    // debug(`${dt.sellvalue} ${CURRENCY_TEXTS[dt.sellcurrency]} = ${convertBuyout(dt.sellvalue + " " + CURRENCY_TEXTS[dt.sellcurrency])} chaos`);
    // debug(`buyout = ${buyout}`);
    // debug(`cada = ${cada}`);
    // debug(`sellOneValue = ${sellOneValue}`);
    // debug(`chaosEquivalent = ${chaosEquivalent}`);
    if (buyout !== 0) {
      item.data("chaosEquivalentEach", cada);
      item.data("chaosEquivalent", chaosEquivalent);
      sortHandle = $(`<span class="chaosEquiv">${(Math.round(cada*100)/100)} ⨯ <div class="currencyimg cur20-4"></div></span>`);
      var tip = getCurrencyChaosEquivTip(tot, cada, CURRENCY_TEXTS[dt.sellcurrency], CURRENCY_TEXTS[dt.buycurrency]);
      tippy(sortHandle[0], {content: tip[0]});
      item.find('div.displayoffer-centered small').first().append(sortHandle);
    }
  } else {
    containerSelector = ITEM_SEARCH_CONTAINER;
    itemSelector = ITEM_SEARCH_SELECTOR;
    var buyout = convertBuyout(item.data().buyout);
    var translated = getCurrency(item.data().buyout);
    if (buyout !== 0) {
      item.data("chaosEquivalent", buyout);
      var sortHandle = $(`<span class="chaosEquiv"><span class="currency currency-chaos">${(Math.round(buyout*100)/100)}×</span></span>`);
      var tip = getChaosEquivTip(item.data().buyout, translated, item.data().ign);
      tippy(sortHandle[0], {content: tip[0], interactive: true});
      item.find('ul.proplist').last().find('li span.sortable').first().after(sortHandle);
      debug(`translated -> ${translated}`);
      if (translated == "Chaos Orb") {
        item.find('ul.proplist').last().find('li span.sortable').first().hide();
      }
    }
  }
  if (sortHandle) {
    sortHandle.on('click', function() {
      sortItemResults(sortKey, ascending, itemSelector, containerSelector);
    });
  }
  if (doSort && getSetting('autoSortByRealCurrency') && (!getSetting('autoGroupSameUser') || containerSelector != ITEM_SEARCH_CONTAINER)) {
    sortItemResults(sortKey, ascending, itemSelector, containerSelector, "Results have been automatically sorted by real currency values.");
  }
};

function addMoreLink(item) {
  var more = $('<a href="#" onclick="return false" class="gs-style">'+item.data().more.length+' more from same user</a>');
  tippy(more[0], {content: "click to group/ungroup results by user"});
  if (getSetting('showGroupButtonOnZeroMoreFromSameUser') || item.data().more.length > 0) {
    item.find("ul.proplist").last().append(more);
    more.wrap('<li class="nowrap">');
    more.on('click', toggleGroup);
  }
  if (item.data().more.length > 0) {
    var perItem = $('<li class="grouped-only nowrap gs-style">'+getPriceSpan((Math.round(item.data().buyoutPerItem*100)/100)+' chaos', true)+' per item</li>');
    item.find("ul.proplist").last().append(perItem);
    var otherResults = $(`<div id="otherResultsFor${item.data('index')}"></div>`);
    $.each( item.data().moreItems, function( key, other ) {
      var value = other.data("buyout");
      var spn = $('<a href="#" class="nowrap">'+getPriceSpan(value, true)+' - '+other.data("shortText")+'</a>');
      otherResults.append(spn);
      otherResults.append('<br />');
      spn.on('click', function(e) {
        e.preventDefault();
        fallbackCopyTextToClipboard(whisperMessage(other.find('.whisper-btn').first()));
      });
    });
    var tip = tippy(perItem[0], {content: otherResults[0], interactive: true});
  }
}

function addMoreFromSameUser() {
  var items = $('.item');
  for (var i = 0; i < items.length; i++) {
    var item = $(items[i]);
    if (!item.data().more) {
      item.data("more", []);
      item.addClass("first");
    }
    if (!item.data().moreItems) {
      item.data("moreItems", []);
    }
    for (var j = i+1; j < items.length; j++) {
      var other = $(items[j]);
      if (other.data().seller == item.data().seller) {
        if (!other.data().more) {
          other.data("more", []);
        }
        if (!other.data().moreItems) {
          other.data("moreItems", []);
        }
        other.data().more.push(item.data().buyout);
        item.data().more.push(other.data().buyout);
        other.data().moreItems.push(item);
        item.data().moreItems.push(other);
      }
    }
    var buyout = convertBuyout(item.data().buyout);
    buyout = item.data().more.reduce(function(a, b) {
      return a + convertBuyout(b);
    }, buyout);
    item.data("more", item.data().more);
    item.data("index", i);
    item.data("totalBuyout", buyout);
    item.data("buyoutPerItem", buyout / (item.data().more.length + 1));
    item.data("buyoutGrouped", (buyout > 0) ? (((buyout / (item.data().more.length + 1)) * 10000) - item.data().more.length) : null);
  }
  if (getSetting('autoGroupSameUser')) {
    groupSameUser(true);
  }
}

function addMaxQtCost(item) {
  var isGem = (item.find(".gem-progress").length > 0 || item.find("img[src*='/2DItems/Gems/']").length > 0 || gemNames.indexOf(item.data().name) >= 0);
  debug("isGem", isGem);
  if (isGem && !(item.find(".corrupted").length > 0 && item.data().quality < 20)) {
    var maxqtcost = Math.max(20 - item.data().quality, 0) * convertBuyout("1 gcp");
    var buyout = convertBuyout(item.data().buyout);
    maxqtcost += buyout;
    item.data("maxqtcost", (buyout ? maxqtcost : null));
    item.find('tr.cell-second .cell-empty').remove();
    item.find('tr.cell-second').first().append('<th colspan="2" class="gs-style">Max QT</th>');
    var td = $(`<td colspan="2" data-name="maxqtcost" data-value="${maxqtcost}" class="real-sort gs-style">${getPriceSpan((Math.round(maxqtcost*100)/100)+" chaos", true)}</td>`);
    item.find('tr.cell-second').last().append(td);
    var tooltip = $(`<div><span>total ${getPriceSpan((Math.round(maxqtcost*100)/100)+" chaos", true)} for buying the gem and gemcutters to bring it to max quality.</span><br /><span>Click to sort results for max quality cost.</span></div>`);
    var tip = tippy(td[0], {content: tooltip[0]});

    td.on('click', function() {
      sortItemResults('maxqtcost', true, 'tbody.item', '#search-results-first');
    });
  }
};

function addMaxNormalizedCost(item) {
  var tier, maxTier;
  [tier, maxTier] = getTier(item.data().name);
  if (tier && maxTier) {
    var buyout = convertBuyout(item.data().buyout);
    var maxTierMulti = Math.pow(3, (maxTier - tier));
    var maxTierBuyout = buyout * maxTierMulti;
    item.data("maxTierMulti", maxTierMulti);
    item.data("maxTierBuyout", maxTierBuyout);
    item.find('tr.cell-second .cell-empty').remove();
    item.find('tr.cell-second').first().append('<th colspan="2" class="gs-style">Max Tier cost</th>');
    var td = $('<td colspan="2" data-name="maxTierBuyout" data-value="'+maxTierBuyout+'" class="real-sort gs-style"></td>');
    var span = getPriceSpan((Math.round(maxTierBuyout*100)/100) + " chaos", true);
    td.append(span);
    item.find('tr.cell-second').last().append(td);
    var tooltip = $(`<div><span>To get a max tier item you need to buy <b>${maxTierMulti}</b> of this tier at ${getPriceSpan(item.data().buyout, true)} for a total of ${getPriceSpan((Math.round(maxTierBuyout*100)/100) + " chaos", true)}</span><br /><span>Click to sort results for max tier cost.</span></div>`);
    var tip = tippy(td[0], {content: tooltip[0]});
    td.on('click', function() {
      sortItemResults('maxTierBuyout', true, 'tbody.item', '#search-results-first');
    });
  }
}

function toggleGroup() {
  if ($(ITEM_SEARCH_CONTAINER).hasClass("grouped")) {
    ungroupSameUser();
  } else {
    groupSameUser();
  }
}

function groupSameUser(showAutoSortMessage) {
  $(".item:not(.first)").hide();
  $(ITEM_SEARCH_CONTAINER).addClass("grouped");
  sortItemResults('buyoutGrouped', ASC, ITEM_SEARCH_SELECTOR, ITEM_SEARCH_CONTAINER, (showAutoSortMessage ? "Results have been automatically grouped by and sorted by real currency values." : null));
}

function ungroupSameUser(doNotSort) {
  $(".item:not(.first)").show();
  $(ITEM_SEARCH_CONTAINER).removeClass("grouped");
  if (!doNotSort) sortItemResults('chaosEquivalent', ASC, ITEM_SEARCH_SELECTOR, ITEM_SEARCH_CONTAINER);
}

function sortItemResults(key, ascending, itemSelector, containerSelector, showAutoSortMessage) {
  $(containerSelector).append($(itemSelector).sort(function(a, b) {
    // debug(`sorting - a: ${$(a).data(key)} - b: ${$(b).data(key)}`);
    if(a === null || $(a).data() === null || $(a).data(key) === null || $(a).data(key) === undefined){
      return 1;
    }
    else if(b === null || $(b).data() === null || $(b).data(key) === null || $(b).data(key) === undefined){
      return -1;
    }
    else if(ascending) {
      return $(a).data(key) - $(b).data(key);
    }
    else if(!ascending) {
      return $(b).data(key) - $(a).data(key);
    }
  }));
  if (showAutoSortMessage) {
    addResultMessage(containerSelector, $(`<span>${showAutoSortMessage} </span>`), 'gs-auto-sort-message', function(div) {
      var lnk = $(`<a href="#">Click here to revert to orginal poe.trade order.</a>`);
      lnk.on('click', function(e) {
        e.preventDefault();
        if (key == "buyoutGrouped") {
          ungroupSameUser(true);
        }
        sortItemResults('origIndex', true, itemSelector, containerSelector);
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
  }
}

function getSaveIcons() {
  var svicon = $(`<a class="gs-style gs-save" data-tippy="Save search"><i class="fas fa-save"></i></a>`);
  var ldicon = $(`<a class="gs-style gs-load" data-tippy="Load search"><i class="fas fa-folder-open"></i></a>`);
  var mticon = $(`<a class="gs-style gs-multi" data-tippy="Multi live search"><i class="fas fa-satellite-dish"></i></a>`);
  if ($('#import-btn').length > 0) {
    $('#import-btn').parent().after(mticon);
    $('#import-btn').parent().after(ldicon);
    $('#import-btn').parent().after(svicon);
    mticon.wrap('<li>');
    ldicon.wrap('<li>');
    svicon.wrap('<li>');
  } else if ($('h3.title').length > 0) {
    $('h3.title').prepend(mticon).prepend(ldicon).prepend(svicon);
  } else {
    $('body').prepend(mticon).prepend(ldicon).prepend(svicon);
  }
  if ($('.live-search-box.alert-box a').length > 0) {
    $('.live-search-box.alert-box a')
    .before(svicon.clone())
    .before(ldicon.clone())
    .before(mticon.clone());
  }
  return [svicon, ldicon, mticon];
}

var getSearchKey = function() {
  return searchesKey;
};

var saveSearch = function() {
  //TODO: generic function to extract significant search params
  //TODO: outline significant search params
  //TODO: set name of search after load
  //TODO: if name would overwrite outline old search params too

  var searches = getSearches();
  var name = saveFrame.contents().find('#searchName').val();
  var saveForm = function() {
    $("#explicit-group-template,#explicit-template").appendTo('body');
    explicit_calculate_group_count();
    searches[name] = $('#search').serialize();
    $("#explicit-group-template,#explicit-template").insertAfter('#prop-mods');
    try {
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
  };
  if (!searches[name] || window.confirm(`A search named ${name} already exists. Do you want to overwrite it?`)) {
    saveForm();
  }
};

var addQuickFilters = function (terms, search, quickFilters) {
  debug(search);
  if (!_.isEmpty(quickFilters["force-league"])) {
    terms.league = [quickFilters["force-league"]];
    search = search.replace(/\bleague=[\w\+\-\s]*\b/i,"league="+quickFilters["force-league"].replace(/\s/i,"+"));
  }
  if (!_.isEmpty(quickFilters["force-cost"]) && (!quickFilters["force-cost-no-override"] || (_.isEmpty(terms.buyout_max) && _.isEmpty(terms.buyout_min) )) ) {
    terms.buyout_max = [quickFilters["force-cost"]];
    terms.buyout_min = [""];
    terms.buyout_currency = ["chaos"];
    search = search.replace(/\bbuyout_max=[\.\w\s]*\b/i,"buyout_max="+quickFilters["force-cost"]);
    search = search.replace(/\bbuyout_min=[\.\w\s]*\b/i,"buyout_min=");
    search = search.replace(/\bbuyout_currency=[\.\w\s]*\b/i,"buyout_currency=chaos");
  }
  return search;
};

var openSearch = function(search, newTab, target, quickFilters) {
  var form = $(`<form id="poeTradeOpener${target ? '-'+target : ''}" class="hide" action="${window.location.protocol}//poe.trade/search" method="post" ${(newTab ? 'target="_blank"' : (target ? 'target="'+target+'"' : ''))}></form>`);
  $('body').append(form);
  var terms = deserialize(search);
  addQuickFilters(terms, search, quickFilters);
  $.each( terms, function( name, values ) {
    $.each( values, function( i, val ) {
      form.append(`<input type="hidden" name="${name}" value="${val}" />`)
    });
  });
  form.submit();
};

var connections = {};
var liveSearches = {};
var old_uniqs = [];
var stopSocket = function (index) {
  debug("WS - Stopped socket "+index);
  clearInterval(liveSearches[index].socket_ping_timer);
  connections[index].close();
  // socketStatus(index, "stopped");
};
var stopAllSockets = function () {
  stopLiveConsole();
  $.each( connections, function( i, c ) {
    stopSocket(i);
  });
};
var resetConnections = function () {
  stopAllSockets();
  connections = {};
  liveSearches = {};
};
var is_focused = true, displayed_item_count = 0;

var openMultiSearch = function(searches, names, live, quickFilters) {
  debug("openMultiSearch", searches);
  try {
    if (!whisperClipboard) {
      error("no whisperClipboard and no error")
    } else {
      debug("whisperClipboard", whisperClipboard)
    }
  } catch(ex) {
    debug("no whisperClipboard found");
    execText(`
      var whisperClipboard = new Clipboard(".whisper-btn", {
          text: function(trigger) {
              return whisperMessage(trigger);
          }
      });
      whisperClipboard.on("success", function(e) {
          $(e.trigger).text("Copied to clipboard");
      });
      whisperClipboard.on("error", function(e) {
          sendWhisper(e.trigger);
      });
    `);
  }
  resetConnections();
  var main;
  if ($("#search-form").length > 0) {
    $("#search-form").hide().nextAll().hide();
    main = $("#search-form");
  } else {
    $("#content").hide();
    main = $("#content");
  }
  $('#items,#live-notification-settings,#multi-live-alert-box').remove();
  main
  .after(`
    <div id="items"></div>
  `)
  .after(`
    <div class="alert-box" id="live-notification-settings">
    Notification settings: <label for="live-notify-sound">Notify with sound</label> <input onclick="live_update_settings()" type="checkbox" id="live-notify-sound"> | <label for="live-notify-browser">Notify with a browser notification</label> <input onclick="live_update_settings()" type="checkbox" id="live-notify-browser">
    <a href="#" class="right" onclick="live_notify(); return false;">test notification</a>
    <audio id="live-audio">
    <source src="/static/notification.mp3" type="audio/mpeg" class="md-opjjpmhoiojifppkkcdabiobhakljdgm">
    </audio>
    </div>
  `)
  .after(`
    <div class="gs-style alert-box live-search" id="multi-live-alert-box">
        Multi Live search: <span id="ms-console-holder"></span>
        <span class="right"><a href="" onclick="location.reload()">back to normal results</a></span>
    </div>
  `);
  setupMultiSearchConsole($('#ms-console-holder'), names);
  live_load_settings();
  $(window).focus(function() {
    is_focused = true;
    displayed_item_count = 0;
    Tinycon.setBubble(0);
  });
  $(window).blur(function() {
    is_focused = false;
  });

  var fetches = [];
  addQuickFiltersMessage("#items", quickFilters, function () {openMultiSearch(searches, names, live, {});});

  var getDeferredSearchId = function(name, search, retry) {
    var deferred = $.Deferred();
    
    var success = function(finalUrl) {
      deferred.resolve(finalUrl);
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
    var terms = deserialize(search);
    search = addQuickFilters(terms, search, quickFilters);

    GM_xmlhttpRequest({
      method: "POST",
      url: window.location.protocol + "//poe.trade/search",
      data: search,
      onload: function(gmXHR) {
        debug("getDeferredSearchId.DONE FETCHING: "+name, gmXHR);
        if (gmXHR && gmXHR.finalUrl) {
          success(gmXHR.finalUrl);
        } else {
          failure(gmXHR);
        }
      },
      onerror: function (gmXHR) {
        var match = /^Refused to connect to \"https?:(\/\/.*)\": Request was redirected to a not whitelisted URL$/.exec((gmXHR && gmXHR.error) ? gmXHR.error : "");
        if (match && match.length > 0) {
          debug("getDeferredSearchId.INTERCEPTED FETCHING: "+name, gmXHR);
          success(window.location.protocol + match[1]);
        } else {
          failure(gmXHR);
        }
      }
    });
    return deferred;
  };

  $.each( searches, function( i, search ) {
    fetches.push(function() {return getDeferredSearchId(names[i], search, 3);});
  });

  pacedWhen(fetches, {failureThreshold: 1})
  .done(function(resources) {
    debug("getDeferredSearchId.DONE ALL FETCHED: ", resources);
    startAllSockets(resources);
  })
  .fail(function () {
    console.error("getDeferredSearchId.FAIL ALL FETCHED: ", arguments);
    $.each( searches, function( i, search ) {
      socketStatus(i, "failed", "fetching");
    });
  });
  close();
};

var startAllSockets = function (resources) {
  startLiveConsole();
  $.each( resources, function( index, res ) {
    setTimeout(function(){
      debug("WS - Connecting ["+index+"]: "+res);
      var connection = startSocket(index, res);
    }, (index * 300) + 100);
  });
};

var startSocket = function(index, res) {
  debug("WS - Starting ["+index+"]: "+res);
  fetchedSocket(index, res);
  liveSearches[index] = {url: res, last_displayed_id: -1};
  if (res) {
    var url;
    if (window.location.protocol == "https:") {
      url = "wss://live.poe.trade/";
    } else {
      url = "ws://live.poe.trade/";
    }

    function multino_pong_received(index) {
      stopSocket(index);
      socketStatus(index, "stopped");
    }

    function multiping_socket(index) {
      if (connections[index]) {
        debug("WS - Sending ping ["+index+"]: ");
        connections[index].send("ping");
        liveSearches[index].pong_timeout = setTimeout(function () {
          debug("WS - Pong timed out ["+index+"]: ");
          multino_pong_received(index);
        }, 3 * 1000);
      }
    }


    var multisubscribe = function (uniqs, index) {
      for (var i = 0; i < uniqs.length; ++i) {
        debug("WS - Subscribing ["+index+"]: ");
        connections[index].send(JSON.stringify({
          type: "subscribe",
          value: uniqs[i]
        }));
      }
    }

    var multilive_kick = function (index) {
      var ls = liveSearches[index];
      ls.kicking = true;
      $.post(ls.url + "/live", {
        "id": ls.last_displayed_id
      }, function(data) {
        debug("WS - Get data: "+ls.url, data);
        ls.last_displayed_id = data["newid"];
        if (data["data"]) {
          if (socket) {
            var uniqs = data["uniqs"];
            ls.old_uniqs = ls.old_uniqs.concat(uniqs);
            multisubscribe(uniqs);
          }
          live_notify();
          $("#items").prepend(data["data"]);
          if (!is_focused) {
            displayed_item_count += data["count"];
            Tinycon.setBubble(displayed_item_count);
          }
          // update_timers();
        }
        ls.kicking = false;
      }).fail(function() {
        $("#live-status").text("Backend failed; retrying... (or try refreshing the page)");
        ls.kicking = false;
      });
    };

    debug("WS - About to live search: ", res);
    multilive_kick(index);
    if (connections[index] && connections[index].readyState != 3) {
      debug("WS - WARNING: Tryed to start not closed connection ["+index+"]", res, connections[index]);
      return connections[index];
    } else {
      var connection = new WebSocket(res.replace(/^.*search\//,url));
      connection.onopen = function(event) {
        debug("WS - Opened connection: "+res, event);

        liveSearches[index].socket_ping_timer = setInterval(function () {
          debug("WS - about to ping ["+index+"]");
          multiping_socket(index);
        }, 60 * 1000);
        liveSearches[index].socket_connect_tries = 0;
        connection.send('{"type": "version", "value": 3}');
        multiping_socket(index);
        debug("WS - restoring uniqs: " + old_uniqs + " for search " + index);
        multisubscribe(old_uniqs, index);

        debug("WS - Opened connection to: "+res, event);
        socketStatus(index, "connected");
      };
      connection.onmessage = function(event) {
        debug("WS - message from:" + res, event);
        var msg = $.parseJSON(event.data);
        var oldLast = liveSearches[index].last_known_id;
        socketStatus(index, (typeof msg != "number" && msg && msg.type && msg.type == "pong") ? "pinged" : "working");
        if (typeof msg == "number") {
          liveSearches[index].last_known_id = Math.max(liveSearches[index].last_known_id, msg);
          if (oldLast != liveSearches[index].last_known_id) {
            multilive_kick(index);
          } else {
            debug("WS - multi live loop prevented:", liveSearches[index], oldLast);
          }
          return;
        }
        switch (msg.type) {
          case "pong":
          // $("#live-status").text("Connected!");
          clearTimeout(liveSearches[index].pong_timeout);
          break;
          case "notify":
          liveSearches[index].last_known_id = Math.max(liveSearches[index].last_known_id, msg.value);
          if (oldLast != liveSearches[index].last_known_id) {
            multilive_kick(index);
          } else {
            debug("WS - multi live loop prevented:", liveSearches[index], oldLast);
          }
          break;
          case "del":
          var uniq = msg.value;
          $(".item-live-" + uniq).addClass("item-gone");
          var idx = liveSearches[index].old_uniqs.indexOf(uniq);
          if (idx != -1)
          liveSearches[index].old_uniqs.splice(idx, 1);
          break;
        }
      };
      connection.onclose = function(event) {
        socketStatus(index, "stopped");
        warn("WS - Error from: "+res, event);

        clearInterval(liveSearches[index].socket_ping_timer);
      };
      connections[index] = connection;
      return connection;
    }
  } else {
    return null;
  }
};

var checkQuickFilters = function() {
  debug("checkQuickFilters - search form", $('#search [name=league]').val(), $('#search [name=buyout_max]').val(), $('#search [name=buyout_min]').val(), $('#search [name=buyout_currency]').val());
  debug("checkQuickFilters - last settings", getSetting("load-frame-last-force-league"), getSetting("load-frame-last-force-cost"));
  var lastForceLeague = getSetting("load-frame-last-force-league");
  var lastForceCost = getSetting("load-frame-last-force-cost");
  if (
    (!_.isEmpty(lastForceLeague) && lastForceLeague != $('#search [name=league]').val()) ||
    (!_.isEmpty(lastForceCost) && (lastForceCost != $('#search [name=buyout_max]').val() || $('#search [name=buyout_min]').val() != "" || $('#search [name=buyout_currency]').val() != "chaos") )
  ) {
    return;
  } else {
    if (_.isEmpty(lastForceLeague) || lastForceLeague != $('#search [name=league]').val()) {
      lastForceLeague = null;
    }
    if (_.isEmpty(lastForceCost) || lastForceCost != $('#search [name=buyout_max]').val() || $('#search [name=buyout_min]').val() != "" || $('#search [name=buyout_currency]').val() != "chaos") {
      lastForceCost = null;
    }

    if (!_.isEmpty(lastForceLeague) || !_.isEmpty(lastForceCost)) {
      var message = `On this search you might have forced ${(lastForceLeague ? ("league to "+lastForceLeague+ ((lastForceCost) ? " and" : "")) : "")} ${(lastForceCost ? ("maximum price of "+lastForceCost+" chaos") : "")}. If there are less results then expected it might be for those additional filters.`;
      addResultMessage(ITEM_SEARCH_CONTAINER, $(`<span><i class="fas fa-exclamation-triangle"></i> ${message} </span>`), 'gs-forced-filters-message', function (div) {
        div.addClass("gs-warning");
      });
    }

  }
};

var addQuickFiltersMessage = function(containerSelector, quickFilters, remove) {
  $('.gs-forced-filters-message').remove();
  if (!_.isEmpty(quickFilters["force-league"]) || !_.isEmpty(quickFilters["force-cost"])) {
    var league = quickFilters["force-league"], cost = quickFilters["force-cost"];
    var message = `On this search you forced ${(league ? ("league to "+league+ ((cost) ? " and" : "")) : "")} ${(cost ? ("maximum price of "+cost+" chaos") : "")}`;
    addResultMessage(containerSelector, $(`<span><i class="fas fa-exclamation-triangle"></i> ${message} </span>`), 'gs-forced-filters-message', function(div) {
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

  var leagues = [], currencies, isCurr, ASC = true, DESC = false, DEFERRED_RESOURCES = {};

var getDeferred = function(url, options) {
  var deferred = $.Deferred();
  if (DEFERRED_RESOURCES[url]) {
    deferred.resolve(DEFERRED_RESOURCES[url]);
  } else {
    var params = $.extend({}, options, {
      method: "GET",
      url: url,
      onload: function (response) {
        DEFERRED_RESOURCES[url] = response;
        deferred.resolve(response);
      },
      onerror: function (error) {
        deferred.fail(error);
        debug(error);
      }
    });
    GM_xmlhttpRequest(params);
  }
  return deferred;
};

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
function isPoe2(url) {
   return /^[^\.]*www\.pathofexile\.com\/trade2.*/.test(url);
}


function resetCurrency(league) {
  if (league) {
    var curr = JSON.parse(localStorage.getItem(namespace+".currencies"));
    delete curr[league];
    localStorage.setItem(namespace+".currencies"+((poe2)?"2":""), JSON.stringify(curr));
  } else {
    localStorage.setItem(namespace+".fixedCurrenciesChanges"+((poe2)?"2":""), JSON.stringify({}));
  }
};

function setCurrencyValue(league, key, value) {
  if (league) {
    var curr = JSON.parse(localStorage.getItem(namespace+".currencies"+((poe2)?"2":"")));
    if (!curr[league].map[key].originalChaosEquiv) {
      curr[league].map[key].originalChaosEquiv = curr[league].map[key].chaosEquivalent;
    }
    curr[league].map[key].chaosEquivalent = value;
    if (curr[league].map[key].originalChaosEquiv === curr[league].map[key].chaosEquivalent) {
      delete curr[league].map[key].originalChaosEquiv;
    }
    localStorage.setItem(namespace+".currencies"+((poe2)?"2":""), JSON.stringify(curr));
  } else {
    var changes = JSON.parse(localStorage.getItem(namespace+".fixedCurrenciesChanges"+((poe2)?"2":""))) || {};
    changes[key] = value;
    if (changes[key] == FIXED_CURRENCY_VALUES.map[key].chaosEquivalent) {
      delete changes[key];
    }
    localStorage.setItem(namespace+".fixedCurrenciesChanges"+((poe2)?"2":""), JSON.stringify(changes));
  }
};

function getCurrencies(league, cb) {
  var doLoadCurrencies = getSetting('enableCurrencyLoad');
  if (doLoadCurrencies) {
    var updated, leaguesToRemove = [], curr = JSON.parse(localStorage.getItem(namespace+".currencies"+((poe2)?"2":"")));
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
        localStorage.setItem(namespace+".currencies"+((poe2)?"2":""), JSON.stringify(curr));
      }
    }
    debug(curr, "curr from localstorage");
    if (curr) curr = curr[league];
    debug(curr, "curr of ["+league+"] from localstorage");
    if (curr && curr.updated) updated = moment(curr.updated);
    var maxAge = getSetting('currencyMaxAge');
    if (!currFailed && (!curr || !updated || (maxAge > 0 && moment.duration(moment().diff(updated)).asHours() >= maxAge))) {
      debug('currencies from poe.ninja not found in session or older then '+maxAge+' hours');
      if (poe2) {
        $.when(
          getDeferred("https://orbwatch.trade/api/currency/market-data?mode=buy&realm="+league, {headers: {Referer: "https://orbwatch.trade/"}})
        ).then(function () {
          curr = {map: {}, lines: [], currencyDetails: []};
          $.each( arguments, function( i, response ) {
            debug("GM_xmlhttpRequest response", response);
            if (response.responseText) {
              var c = JSON.parse(response.responseText);
              curr.updated = moment().valueOf();
              debug("orbwatch", c);
              curr.currencyDetails = [];
              curr.lines = [];
              curr.map = {};
              if (c.data && c.data.currencies) {
                $.each(c.data.currencies, function( ii, c ) {
                  curr.currencyDetails.push({
                    icon: c.icon,
                    id: ii,
                    name: c.name,
                    tradeId: c.id
                  });
                  curr.lines.push({
                    chaosEquivalent: 1 / c.median_price,
                    currencyTypeName: c.name,
                    detailsId: _.kebabCase(c.name)
                  });
                  curr.map[_.kebabCase(c.name)] = {
                    chaosEquivalent: 1 / c.median_price,
                    currencyTypeName: c.name,
                    detailsId: _.kebabCase(c.name)
                  };
                });
              }
            } else {
              console.log("unable to load orbwatch.trade values for league: "+league);
              debug(response);
            }
          });
          if (curr.lines.length > 0) {
            curr.lines = curr.lines.sort(function(a, b) {
              return b.chaosEquivalent - a.chaosEquivalent;
            });
            debug(curr, "currencies from orbwatch.trade");
            var ccc = JSON.parse(localStorage.getItem(namespace+".currencies"+((poe2)?"2":"")));
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
            localStorage.setItem(namespace+".currencies"+((poe2)?"2":""), JSON.stringify(ccc));
            cb(curr);
          } else {
            currFailed = true;
            cb(null);
          }
        },function () {
          console.log("unable to load orbwatch.trade values");
          debug("GM_xmlhttpRequest errors", arguments);
          currFailed = true;
          cb(null);
        });
      } else {
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
            var ccc = JSON.parse(localStorage.getItem(namespace+".currencies"+((poe2)?"2":"")));
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
            localStorage.setItem(namespace+".currencies"+((poe2)?"2":""), JSON.stringify(ccc));
            cb(curr);
          } else {
            cb(null);
          }
        },function () {
          console.log("unable to load Poe.Ninja values");
          debug("GM_xmlhttpRequest errors", arguments);
          cb(null);
        });
      }
    } else {
      debug(curr, "currencies taken from browser session");
      cb(curr);
    }
  } else {
    var changes = JSON.parse(localStorage.getItem(namespace+".fixedCurrenciesChanges"+((poe2)?"2":""))) || {};
    var curr = $.extend( true, {}, poe2 ? FIXED_CURRENCY_VALUES2 : FIXED_CURRENCY_VALUES );
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
          <th scope="col">${poe2 ? 'Exalted' : 'Chaos'} equivalent</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>`);

    iframe[0].contentWindow.$(`#${lid}-pane`).empty().append(tbl);
    var tbody = iframe[0].contentWindow.$(`#curr-table-${lid} tbody`);
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
          iframe[0].contentWindow.$(`#${lid}-pane`).prepend(`<p>Last update at ${moment(curr.updated).format("HH:mm")} - ${(getSetting('currencyMaxAge')>0) ? "Values will be refreshed after "+moment(curr.updated).add(getSetting('currencyMaxAge'), 'h').format("HH:mm") : "Max age set to 0, can only be refreshed manually"} - </p>`);
        } else {
          iframe[0].contentWindow.$(`#${lid}-pane`).prepend(`<p></p>`);
        }
        var refreshButton = $(`<a href="#" onclick="return false;">${((l) ? 'refresh now' : 'reset all values')}</a>`);
        refreshButton.on('click', function(e) {
          e.preventDefault();
          resetCurrency(l);
          generateCurrencyTable(l, lid);
        });
        iframe[0].contentWindow.$(`#${lid}-pane p:first`).append(refreshButton);
      } else {
        iframe[0].contentWindow.$(`#${lid}-pane`).empty().append(`<div class="alert alert-warning" role="alert">Unable to load currency values from ${poe2 ? 'orbwatch.trade' : 'poe.ninja'} for league ${l}</div>`);
      }
    });
  };

  if (getSetting('enableCurrencyLoad')) {
    iframe[0].contentWindow.$('#preloaded-tab').addClass('disabled');
    iframe[0].contentWindow.$('#leagues-tab,.preloaded-info').addClass('d-none');
    iframe[0].contentWindow.$('.loaded-info').removeClass('d-none');
    iframe[0].contentWindow.$('#preloaded-pane').removeClass('show active');
    $.each( leagues, function( i, l ) {
      var lid = _.kebabCase(l);
      if (iframe[0].contentWindow.$(`#${lid}-tab`).length === 0) {
        iframe[0].contentWindow.$('#myCurrTab').append(`<li class="nav-item">
          <a class="nav-link" id="${lid}-tab" data-toggle="tab" href="#${lid}-pane" onclick="return false;" role="tab" aria-controls="${lid}-pane" aria-selected="false">${l}</a>
        </li>`);
        iframe[0].contentWindow.$('#myCurrTabContent').append(`<div class="tab-pane fade" id="${lid}-pane" role="tabpanel" aria-labelledby="${lid}-tab">
          ${l} Tab
        </div>`);
      }
      iframe[0].contentWindow.$(`#${lid}-tab`).on('click', function() {
        generateCurrencyTable(l, lid);
      });
    });
    iframe[0].contentWindow.$(`#currency .tab-pane,#currency .nav-link`).removeClass('show active');
    iframe[0].contentWindow.$(`#${_.kebabCase(getCurrentLeague())}-tab`).addClass('active').click();
    iframe[0].contentWindow.$(`#${_.kebabCase(getCurrentLeague())}-pane`).addClass('show active');
  } else {
    iframe[0].contentWindow.$('#preloaded-tab').removeClass('disabled');
    iframe[0].contentWindow.$('#leagues-tab,.preloaded-info').removeClass('d-none');
    iframe[0].contentWindow.$('.loaded-info').addClass('d-none');
    iframe[0].contentWindow.$('#preloaded-pane').addClass('show active');
    iframe[0].contentWindow.$('#currency .tab-pane:not(#leagues-pane):not(#preloaded-pane)').remove();
    iframe[0].contentWindow.$('#currency .nav-link:not(#leagues-tab):not(#preloaded-tab)').remove();
    iframe[0].contentWindow.$(`#currency .tab-pane,#currency .nav-link`).removeClass('show active');
    iframe[0].contentWindow.$(`#preloaded-tab`).on('click', function() {
      generateCurrencyTable(null, "preloaded");
    });
    iframe[0].contentWindow.$(`#preloaded-tab`).addClass('active').click();
    iframe[0].contentWindow.$(`#preloaded-pane`).addClass('show active');
  }
  var c = JSON.parse(localStorage.getItem(namespace+".currencies"+((poe2)?"2":"")));
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
      case "transmute":
      return "Orb of Transmutation";
      break;
      case "augmentation":
      case "aug":
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
        warn("WARNING: Can't find currency '"+curr+"'", currencies);
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
      click to sort for current ${poe2 ? 'orbwatch.trade' : 'poe.ninja'} values</div>`);
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
      <br /><small>calculated using current ${poe2 ? 'orbwatch.trade' : 'poe.ninja'} values:</small>
      <br class="${translated == 'Chaos Orb' ? 'hide' : ''}" /><small class="${translated == 'Chaos Orb' ? 'hide' : ''}">1 ${translated} = ${(Math.round(sellOneValue*100)/100)} chaos / 1 chaos = ${(Math.round((1/sellOneValue)*10000)/10000)} ${translated}</small>
      <br class="${buycurrTranslated == 'Chaos Orb' ? 'hide' : ''}" /><small class="${buycurrTranslated == 'Chaos Orb' ? 'hide' : ''}">1 ${buycurrTranslated} = ${(Math.round(buyOneValue*100)/100)} chaos / 1 chaos = ${(Math.round((1/buyOneValue)*10000)/10000)} ${buycurrTranslated}</small>
      <br />click to sort for current ${poe2 ? 'orbwatch.trade' : 'poe.ninja'} values</div>`);
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
      <div class="col-md-12 py-2">
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
  saveFrame[0].contentWindow.$("#searchName").typeahead('destroy');
  saveFrame[0].contentWindow.$("#searchName").typeahead({
    source: Object.keys(getSearches()).sort(),
    item: '<li class="dropdown-item"><a class="dropdown-item" href="#" role="option"></a></li>',
    autoSelect: false
  });

  var queries = app.query.query;
  debug(queries);
  var explain = saveFrame[0].contentWindow.$(".explain");
  explain.empty()
  .append(`<div><strong>${app.state.league}</strong> league</div>`);
  if (queries.filters) {
    $.each( queries.filters, function( key, filter ) {
      explain.append(`<div><strong>${_.startCase(key)}</strong>: ${JSON.stringify(filter)}</div>`);
    });
  }
  if (queries.stats) {
    $.each( queries.stats, function( i, query ) {
      explain.append('<hr />').append(`<div>type: ${query.type}${((query.disabled)?' (disabled)':'')}<div>`);
      $.each( query.filters, function( i, filter ) {
        explain.append(`<div><strong>${app._data.static_.knownStatsFlat[filter.id].text}</strong>${((filter.disabled)?' (disabled)':'')}: ${JSON.stringify(filter.value)}<div>`);
      });
    });
  }
  if (queries.have) {
    explain.append(`<div><strong>Have</strong>: ${JSON.stringify(queries.have)}</div>`);
  }
  if (queries.want) {
    explain.append(`<div><strong>Want</strong>: ${JSON.stringify(queries.want)}</div>`);
  }
  if (queries.stock) {
    explain.append(`<div><strong>Stock</strong>: ${JSON.stringify(queries.stock)}</div>`);
  }

};

var checkMultiSelected = function () {
  multiframe[0].contentWindow.$('#multi-live').prop('disabled', $("#search-list .form-check-input:checked", multiFrame[0].contentWindow.document).length === 0);
}

var loadMultiSearches = function(retryed) {
  //TODO: text for no results
  //TODO: filter list by other meta data
  //TODO: tooltip significant search params
  multiframe[0].contentWindow.$('#search-list').empty();

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

    multiframe[0].contentWindow.$('#search-list').append(row);
  });
  if (Object.keys(searches).length <= 0) {
    multiframe[0].contentWindow.$('#no-searches-alert').removeClass("d-none");
  } else {
    multiframe[0].contentWindow.$('#no-searches-alert').addClass("d-none");
  }

  $("#search-list .form-check-input", multiFrame[0].contentWindow.document).on('change', checkMultiSelected);
  checkMultiSelected();
  setupSearchAdditions(multiFrame);

  if (!retryed && Object.keys(searches).length > 0 && multiframe[0].contentWindow.$('#search-list tr').length === 0) {
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
    var row = loadFrame[0].contentWindow.$(`<tr></tr>`);
    row.data("name", k);
    row.data("params", deserialize(searches[k]));

    var lnk = loadFrame[0].contentWindow.$(`<a href="#" onclick="return false;">${k}</a>`);
    lnk.on( "click", function(e) {
      openSearch(searches[k], e.ctrlKey, null, getSearchAdditions(loadFrame));
    });
    row.append(lnk);
    lnk.wrap('<td class="col-md-10">');

    var ren = loadFrame[0].contentWindow.$(`<a href="#" onclick="return false;" title="rename"><i class="fas fa-edit"></i></a>`);
    ren.on( "click", function(e) {
      loadFrame[0].contentWindow.$("#renameName").val(k);
      loadFrame[0].contentWindow.$("#renameButton").one('click', function() {
        renameSearch(k, loadFrame[0].contentWindow.$("#renameName").val());
        loadFrame[0].contentWindow.$("#renameModal").modal('hide');
      });
      loadFrame[0].contentWindow.$("#renameModal").modal('show');
    });
    row.append(ren);
    ren.wrap('<td>');

    // var cpic = $(getColorPickerTemplate());
    // row.append(cpic);
    // cpic.wrap('<td>');
    // cpic.tinycolorpicker({image: colorsImage, color: ((searchProperties[k] && searchProperties[k].color) ? searchProperties[k].color : null)});
    // cpic.on( "change", function(e, colorHex, colorRGB) {
    //   debug(arguments);
    //   colorSearch(k, colorHex);
    // });

    var del = loadFrame[0].contentWindow.$(`<a href="#" onclick="return false;" title="delete"><i class="fas fa-trash"></i></a>`);
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
<div class="container-fluid fixed-top">
  <div class="row">
    <form class="col-md-12 py-2 mb-0">
      <h5>Multi live search</h5>
      <div class="input-group">
        <input type="text" class="form-control border-primary" name="searchName" id="searchName" placeholder="Filter list..." autocomplete="off" />
        <span class="input-group-text" id="basic-addon2"><i class="fas fa-filter"></i></span>
      </div>
    </form>
  </div>
</div>
<div class="container-fluid middle-list">
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
<div class="container-fluid fixed-bottom py-2 border-top">
  <div class="row justify-content-end">
    <div class="col-4 col-md-3">
      <button id="multi-live" type="button" class="btn btn-primary">
        Search <i class="fas fa-satellite-dish"></i>
      </button>
    </div>
    <div class="col-2">
      <button id="" type="button" class="btn gs-btn-close">
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
        <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control border-primary" name="renameName" id="renameName" autocomplete="off" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
        <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
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
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" id="doImportButton" class="btn btn-primary">Import</button>
      </div>
    </div>
  </div>
</div>
<div class="container-fluid fixed-top">
  <div class="row">
    <form class="col-md-12 pb-0">
      <h5>Load search</h5>
      <div class="input-group">
        <input type="text" class="form-control border-primary" name="searchName" id="searchName" placeholder="Filter list..." autocomplete="off" />
        <span class="input-group-text" id="basic-addon2"><i class="fas fa-filter"></i></span>
      </div>
    </form>
  </div>
</div>
<div class="container-fluid middle-list">
  <form>
    <div class="row px-1">
      <div class="col" id="search-additions-force-cost">
      </div>
      <div class="col" id="search-additions-force-league">
      </div>
    </div>
  </form>
  <div class="row pb-5">
    <div class="col-md-12 table-responsive">
      <table class="table table-sm" id="search-list">
      </table>
    </div>
  </div>
</div>
<div class="container-fluid fixed-bottom py-2 border-top">
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
      <button id="" type="button" class="btn gs-btn-close">
        Close
      </button>
    </div>
  </div>
</div>
`;

var saveFrameContent = /* html */ `
<div class="container-fluid">
  <div class="row">
    <form class="col-md-12 py-2">
      <h5>Save search</h5>
      <div class="input-group">
        <input type="text" class="form-control typeahead border-primary" name="searchName" id="searchName" placeholder="Search name..." autocomplete="off" />
        <button id="saveButton" type="button" class="btn btn-outline-primary">
          <i class="fas fa-save"></i>
        </button>
        <button id="" type="button" class="d-none btn btn-outline-primary gs-btn-close">
          <i class="fas fa-window-close"></i>
        </button>
      </div>
    </form>
  </div>
  <div class="row">
    <div class="col-md-12 explain">
    </div>
  </div>
  <div class="row">
    <div class="col-md-12 fixed-bottom mb-2">
      <button id="" type="button" class="btn gs-btn-close gs-pull-right">
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
      iframe[0].contentWindow.$("#search-list tr")
      .filter(function() {
        if (iframe[0].contentWindow.$(e.target).val() == "" || iframe[0].contentWindow.$(this).data('name').toLowerCase().indexOf(iframe[0].contentWindow.$(e.target).val().toLowerCase()) >= 0) {
          iframe[0].contentWindow.$(this).removeClass("d-none");
        } else {
          iframe[0].contentWindow.$(this).addClass("d-none");
        }
      });
    }
  });
};

var addSearchAdditions = function(iframe) {
  var forceLeagueCheckbox = iframe[0].contentWindow.$(/* html */ `<div class="form-group form-check form-control-sm">
    <input type="checkbox" class="form-check-input" id="force-league">
    <label class="form-check-label" for="force-league">Force <span class="current-league"></span> league</label>
  </div>`);
  var forceMaxCostCheckbox = iframe[0].contentWindow.$(/* html */ `<div>
    <div class="row form-control-sm">
      <label for="force-cost" class="col-sm-8 col-form-label">force max ${poe2 ? 'exalted':'chaos'} cost</label>
      <div class="col-sm-4">
        <input type="number" class="form-control form-control-sm" id="force-cost">
      </div>
    </div>
    <div class="row mb-3 form-control-sm">
      <div class="">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="force-cost-no-override">
          <label class="form-check-label" for="force-cost-no-override">only if max cost isn't specified in search</label>
        </div>
      </div>
    </div>
  </div>`);
  iframe[0].contentWindow.$("#search-additions-force-league").empty().append(forceLeagueCheckbox);
  iframe[0].contentWindow.$("#search-additions-force-cost").empty().append(forceMaxCostCheckbox);
  iframe[0].contentWindow.$("#force-league").on("click change", function () {
    setSetting(iframe.attr("id")+"-last-force-league", iframe[0].contentWindow.$("#force-league").is(':checked'));
  });
  iframe[0].contentWindow.$("#force-cost-no-override").on("click change", function () {
    setSetting(iframe.attr("id")+"-last-force-cost-no-override", iframe[0].contentWindow.$("#force-cost-no-override").is(':checked'));
  });
  iframe[0].contentWindow.$("#force-cost").on("click change", function () {
    setSetting(iframe.attr("id")+"-last-force-cost", iframe[0].contentWindow.$("#force-cost").val());
  });
};

var setupSearchAdditions = function(iframe) {
  var lg = getCurrentLeague();
  if (lg) {
    var lastForceLeague = getSetting(iframe.attr("id")+"-last-force-league");
    iframe[0].contentWindow.$("#search-additions-force-league .current-league").text(lg);
    iframe[0].contentWindow.$("#force-league").prop("checked", ""+lastForceLeague == "true").prop("disabled", false);
  } else {
    iframe[0].contentWindow.$("#search-additions-force-league .current-league").text("");
    iframe[0].contentWindow.$("#force-league").prop("checked", false).prop("disabled", true);
  }
  var lastForceCost = getSetting(iframe.attr("id")+"-last-force-cost");
  var lastForceCostNoOverride = getSetting(iframe.attr("id")+"-last-force-cost-no-override");
  iframe[0].contentWindow.$("#force-cost-no-override").prop("checked", ""+lastForceCostNoOverride == "true");
  iframe[0].contentWindow.$("#force-cost").val(lastForceCost);
};

var getSearchAdditions = function(iframe) {
  var options = {};
  options["force-cost-no-override"] = iframe[0].contentWindow.$("#force-cost-no-override").is(':checked');
  options["force-league"] = (iframe[0].contentWindow.$("#force-league").is(':checked') ? getCurrentLeague() : false);
  options["force-cost"] = iframe[0].contentWindow.$("#force-cost").val();
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

  iframe[0].contentWindow.$('.gs-btn-close').on('click', function() {
    closeFrame("multi-frame")
  });

  iframe[0].contentWindow.$('#multi-live').on('click', function() {
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

  iframe[0].contentWindow.$('#check-all').on('click', function() {
    $("#search-list .form-check-input:visible", iframe[0].contentWindow.document).prop('checked', true);
    checkMultiSelected();
  });
  iframe[0].contentWindow.$('#check-none').on('click', function() {
    $("#search-list .form-check-input:visible", iframe[0].contentWindow.document).prop('checked', false);
    checkMultiSelected();
  });

  if (callback) callback();
};

var createLoadFrame = function(iframe, callback) {
  // setTimeout(function(){
  // iframe.on('load',function(){
    loadFrame = iframe;

    iframe[0].contentWindow.$('.gs-btn-close').on('click', function() {
      closeFrame("load-frame")
    });
    debug("iframe[0].contentWindow.$('.gs-btn-close')", iframe[0].contentWindow.$(".gs-btn-close"));
    iframe[0].contentWindow.$('#export').on('click', function() {
      download("poetrade-searches.txt", localStorage.getItem(getSearchKey()));
    });

    iframe[0].contentWindow.$('#import').on('click', function() {
      iframe[0].contentWindow.$("#doImportButton").one('click', function() {
        importSearch(iframe[0].contentWindow.$("#importText").val(), iframe[0].contentWindow.$("#importOverwrite").is(":checked"));
        trace(iframe[0].contentWindow.$("#importOverwrite"));
        iframe[0].contentWindow.$("#importModal").modal('hide');
      });
      iframe[0].contentWindow.$("#importModal").modal('show');
    });

    // $("#renameModal", iframe[0].contentWindow.document).modal({show: false});
    iframe[0].contentWindow.$("#renameModal").modal({show: false});
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

    iframe[0].contentWindow.$('.gs-btn-close').on('click', function() {
      closeFrame("save-frame")
    });
    iframe[0].contentWindow.$('#saveButton').on('click', saveSearch);

    $(iframe[0].contentWindow.document).keydown(function(e) {
      if(e.which == 13 && e.target && e.target.id == "searchName") {
        e.preventDefault();
        if (saveFrame[0].contentWindow.$("#searchName + ul.typeahead.dropdown-menu .dropdown-item.active").length == 0
          || !saveFrame[0].contentWindow.$("#searchName + ul.typeahead.dropdown-menu").first().is(":visible")) {
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
    //addIframe({id:"multi-frame", frameTemplate: frameTemplate, contents: multiFrameContent, trigger: ".gs-multi", builder: createMultiFrame, onOpen: loadMultiSearches}, function() {});

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
    item.find("td.item-cell h5 .found-time-ago").after(`<a target="_blank" class="wiki-link gs-style" href="https://www.poewiki.net/wiki/${itemProps.baseItem}">[wiki]</a>`);
  } else if (itemProps.rarity == "Normal" && item.find("td.item-cell h5 .wiki-link").length == 0) {
    item.find("td.item-cell h5 .found-time-ago").after(`<a target="_blank" class="wiki-link gs-style" href="https://www.poewiki.net/wiki/${itemProps.name}">[wiki]</a>`);
  }
}



  var enhanceItemSearch = function(loc) {
    debug("ITEM SEARCH!");
    initPage(loc, function(){
      debug("After init ITEM SEARCH")
      var league = getCurrentLeague();
      debug(`league: ${league}`);
      getCurrencies(league, function(curr) {
        debug(`curr: ${curr}`);
        currencies = curr;
        if (getSetting('useSaveManager')) initSaveManager();
        if (currencies && currencies.map) {
          if (getSetting('enableGroupedResults')) addMoreFromSameUser();
          $('.item').each(function(i) {
            var item = $(this);
            item.data("origIndex", i);
            debug(item);
            debug(item.data());
            if (currencies && currencies.map) {
              if (getSetting('enableChaosEquiv')) addChaosEquiv(item, item.is(".item:last"));
              if (getSetting('enableMaxQtCost')) addMaxQtCost(item);
              if (getSetting('enableCopyForPoB')) addCopyForPoB(item);
              if (getSetting('enableMaxNormCost')) addMaxNormalizedCost(item);
            }
          });
          if (getSetting('enableGroupedResults')) {
            $('.item').each(function() {
              var item = $(this);
              if (currencies && currencies.map) {
                addMoreLink(item);
              }
            });
          }
          if (getSetting('enableCopyForPoB')) {
            var pobClipboard = new Clipboard(".pob-clip-btn", {
              text: function(trigger) {
                return $(trigger).parents(".item").data("text");
              }
            });
          }
          checkQuickFilters();
        } else {
          debug("Some features are disabled because we've been unable to load Poe.Ninja currency values.")
        }
      });
    });
  };

  var enhanceCurrencySearch = function(loc) {
    debug("CURRENCY SEARCH!");
    initPage(loc, function(){
      if (getSetting('trackContactedOnCurrencySearches')) {
        $("span.right a:contains('Contact seller')").on("click", function() {
          $('span.right a.lastClicked').removeClass('lastClicked');
          $(this).addClass('lastClicked');
        });

        $('#contacttext').on('click', function() {
          var lst = $('span.right a.lastClicked:not(.currencyClicked)').last();
          if (lst) lst.text(lst.text() + " clicked").addClass('currencyClicked');
        });
      }

      $(document).on('opened.fndtn.reveal', '#contactmodal', function () {
        if (getSetting('customQuantitiesOnCurrencySearches')) {
          var modal = $(this);
          $("#contactsellval").editable("click", function(e) {
            debug(e, "sell value");
            debug(current_offer, "current_offer");
            update_offer_numbers(Number(e.value)/current_offer.buyvalue);
          });
          $("#contactbuyval").editable("click", function(e) {
            debug(e, "buy value");
            debug(current_offer, "current_offer");
            update_offer_numbers(Number(e.value)/current_offer.sellvalue);
          });
        }
      });

      var league = getCurrentLeague();
      getCurrencies(league, function(curr) {
        currencies = curr;
        if (currencies && currencies.map && getSetting('addChaosEquivOnCurrencySearches')) {
          $('.displayoffer').each(function(i) {
            var item = $(this);
            item.data("origIndex", i);
            if (currencies && currencies.map) {
              addChaosEquiv(item, item.is(".displayoffer:last"));
            }
          });
        } else {
          debug("Some features are disabled because we've been unable to load Poe.Ninja currency values.")
        }
      });
    });

  };

  var matchers = [
    
    { matcher: /^[^\.]*poe\.trade\/search.*$/, callback: enhanceItemSearch },                 // Item search
    { matcher: /^[^\.]*poe\.trade\/?$/, callback: enhanceItemSearch },                        // Item page
    { matcher: /^.*currency\.poe\.trade\/search.*$/, callback: enhanceCurrencySearch },       // Currency search
    { matcher: /^.*currency\.poe\.trade\/?$/, callback: initPage }                            // Currency page
  ]

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

})();
