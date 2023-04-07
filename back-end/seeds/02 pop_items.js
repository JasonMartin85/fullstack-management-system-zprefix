/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {
      userid: 1,
      item_name: 'Red Fir', 
      sci_name: 'Abies procera', 
      description: 'A. procera is a large evergreen conifer with a narrow conic crown, growing up to 70 meters (230 ft) tall and 2 m (6 ft 7 in) in trunk diameter, rarely to 90 m (295 ft) tall and 2.7 m (8 ft 10 in) thick. The bark on young trees is smooth and gray with resin blisters, becoming red-brown, rough and fissured on old trees, usually less than 5 centimeters (2 in) thick; the inner bark is reddish. The leaves are needle-like, 1–3.5 cm (1⁄2–1+1⁄2 in) long, glaucous blue-green above and below with strong stomal bands, and a blunt to notched tip. They are arranged spirally on the shoot, but twisted slightly S-shaped to be upcurved above the shoot. The cones are erect, 11–22 cm (4+1⁄4–8+3⁄4 in) long and 6 cm (2+1⁄4 in) thick, with the purple scales almost completely hidden by the long exserted yellow-green bract scales; they ripen brown and disintegrate to release the winged seeds in fall. Viable seeds are only produced every few years.', 
      quantity:23,
      img_string:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Abies_procera_Rog%C3%B3w_1.jpg/800px-Abies_procera_Rog%C3%B3w_1.jpg"
    },
    {
      userid: 1, 
      item_name: 'Genip Tree', 
      sci_name: 'Genipa americana', 
      description: 'Genipa americana trees are up to 30 m tall and up to 60 cm dbh. Their bark is smooth with little fissures. The leaves are opposite, obovate, or obovate oblong, 10–35 cm long, 6–13 cm wide, and glossy dark green, with entire margin, acute or acuminate apex, and attenuated base. The inflorescences are cymes up to 10 cm long. The flowers are white to yellowish, slightly fragrant, calyx bell-shaped, corolla at 2–4.5 cm long, trumpet-shaped, and five- or six-lobed. The five short stamens are inserted on top of the corolla tube. The fruit is a thick-skinned edible greyish berry 10–12 cm long, 5–9 cm in diameter.', 
      quantity:5,
      img_string: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Genipa_americana_L._-_Flickr_-_Alex_Popovkin%2C_Bahia%2C_Brazil.jpg'
    },
    {
      userid: 2, 
      item_name: 'White Oak',
      sci_name: 'Quercus alba', 
      description: 'Quercus alba typically reaches heights of 24 to 30 metres (80–100 feet) at maturity, and its canopy can become quite massive as its lower branches are apt to extend far out laterally, parallel to the ground. Trees growing in a forest will become much taller than ones in an open area which develop to be short and massive. The Mingo Oak was the tallest known white oak at over two hundred feet with a trunk height of 44.2 m (145 ft) before it was felled in 1938. It is not unusual for a white oak tree to be as wide as it is tall, but specimens growing at high altitudes may only become small shrubs. The bark is a light ash-gray and peels somewhat from the top, bottom and/or sides.', 
      quantity:200,
      img_string: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Keeler_Oak_Tree_-_distance_photo%2C_May_2013.jpg/1024px-Keeler_Oak_Tree_-_distance_photo%2C_May_2013.jpg'
    },
    {
      userid: 3, 
      item_name: 'American elm',
      sci_name: 'Ulmus americana', 
      description: 'Ulmus americana, generally known as the American elm or, less commonly, as the white elm or water elm, is a species of elm native to eastern North America, naturally occurring from Nova Scotia west to Alberta and Montana, and south to Florida and central Texas. The American elm is an extremely hardy tree that can withstand winter temperatures as low as −42 °C (−44 °F).', 
      quantity:12,
      img_string: 'https://upload.wikimedia.org/wikipedia/commons/8/86/American_Elm_Tree%2C_Old_South_Street%2C_Northampton%2C_MA_-_October_2019.jpg'
    },
    {
      userid: 2, 
      item_name: 'Subalpine Larch',
      sci_name: 'Larix lyallii', 
      description: 'Larix lyallii is a small tree, growing from 10 to 25 meters (33 to 82 ft) tall and shorter at higher elevations. It has a straight trunk with a sparse and somewhat conical crown. The branches are horizontal, perpendicular to the trunk, irregularly spaced and twisted. The twigs are finely hairy. The needles are four-angled, 20 to 35 millimeters (3⁄4 to 1+1⁄2 in) long and crowded in groups of 30 to 40 on short spurs. They are pale blue-green and deciduous, turning golden yellow in autumn.', 
      quantity:999,
      img_string: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/SubalpineLarch_7735tl.jpg'
    },
    {
      userid: 2, 
      item_name: 'Common Hackberry',
      sci_name: 'Celtis occidentalis', 
      description: 'The common hackberry is a medium-sized tree, 9 to 15 metres (30 to 50 ft) in height, with a slender trunk. In the best conditions in the southern Mississippi Valley area, it can grow to 40 metres (130 ft). It has a handsome round-topped head and pendulous branches. It prefers rich moist soil, but will grow on gravelly or rocky hillsides. The roots are fibrous and it grows rapidly. In the western part of its range, trees may still grow up to 29 m (95 ft). The maximum age attained by hackberry is probably between 150 and 200 years in ideal conditions.', 
      quantity:1,
      img_string: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Celtis_occidentalis_20090606.jpg/220px-Celtis_occidentalis_20090606.jpg'
    },
    {
      userid: 3, 
      item_name: 'American Sweetgum',
      sci_name: 'Liquidambar styraciflua', 
      description: 'This plants genus name Liquidambar was first given by Linnaeus in 1753 from the Latin liquidus (fluid) and the Arabic ambar (amber), in allusion to the fragrant terebinthine juice or gum which exudes from the tree. Its specific epithet styraciflua is an old generic name meaning flowing with storax (a plant resin). The name "storax" has long been confusingly applied to the aromatic gum or resin of this species, that of L. orientalis of Turkey, and to the resin better known as benzoin from various tropical trees in the genus Styrax.', 
      quantity:44,
      img_string: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/2014-11-02_13_06_29_Sweet_Gum_during_autumn_along_Lower_Ferry_Road_in_Ewing%2C_New_Jersey.JPG/220px-2014-11-02_13_06_29_Sweet_Gum_during_autumn_along_Lower_Ferry_Road_in_Ewing%2C_New_Jersey.JPG'
    },
    {
      userid: 2, 
      item_name: 'Quacking Aspen',
      sci_name: 'Populus tremuloides', 
      description: 'Quaking aspen is a tall, fast-growing tree, usually 15–18 meters (50–60 ft) at maturity, with a trunk 25 centimeters (10 in) in diameter; records are 36.5 m (119 ft 9 in) in height and 1.37 m (4 ft 6 in) in diameter. The bark is relatively smooth, whitish (light green when young), and is marked by thick black horizontal scars and prominent black knots. Parallel vertical scars are tell-tale signs of elk, which strip off aspen bark with their front teeth.', 
      quantity:78,
      img_string: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/2013-10-06_15_04_21_Aspens_during_autumn_along_the_Changing_Canyon_Nature_Trail_in_Lamoille_Canyon%2C_Nevada.jpg/220px-2013-10-06_15_04_21_Aspens_during_autumn_along_the_Changing_Canyon_Nature_Trail_in_Lamoille_Canyon%2C_Nevada.jpg'
    },
    {
      userid: 2, 
      item_name: 'American Hophornbeam',
      sci_name: 'Ostrya virginiana', 
      description: 'American hophornbeam is a small deciduous understory tree growing to 18 m (59 ft) tall and 20–50 centimetres (8–20 in) trunk diameter. The bark is brown to gray-brown, with narrow shaggy plates flaking off, while younger twigs and branches are smoother and gray, with small lenticels. Very young twigs are sparsely fuzzy to thickly hairy; the hairs (trichomes) drop off by the next year.', 
      quantity:29,
      img_string: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Ostrya_virginiana_2.jpg/220px-Ostrya_virginiana_2.jpg'
    },
    {
      userid: 2, 
      item_name: 'Chinquapin Oak',
      sci_name: 'Quercus muehlenbergii', 
      description: 'Quercus muehlenbergii(Chinquapin Oak) is monoecious in flowering habit; flowers emerge in April to late May or early June. The staminate flowers are borne in catkins that develop from the leaf axils of the previous year, and the pistillate flowers develop from the axils of the current years leaves. The fruit, an acorn or nut, is borne singly or in pairs, matures in one year, and ripens in September or October. About half of the acorn is enclosed in a thin cup and is chestnut brown to nearly black.', 
      quantity:14,
      img_string: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/20220911_Ruth.jpg/220px-20220911_Ruth.jpg'
    },
  ]);
};
