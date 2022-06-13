CREATE DATABASE  IF NOT EXISTS starbucks;
use starbucks;

DROP TABLE IF EXISTS consumable;
CREATE TABLE consumable(
	consumableID char(3) primary key,
    consumableName varchar(50) not null
);

DROP TABLE IF EXISTS beverage_type;
CREATE TABLE beverage_type(
	bevTypeID char(3) primary key,
    bevTypeName varchar(25) not null
);

DROP TABLE IF EXISTS beverage_size;
CREATE TABLE beverage_size(
	bevSizeID char(3) primary key,
    bevSizeName varchar(25) not null
);

DROP TABLE IF EXISTS beverage;
CREATE TABLE beverage(
	beverageID char(3) primary key,
    consumableID char(3),
    bevTypeID char(3),
    beverageName varchar(100) not null,
    beverageDesc varchar(255),
	calories int,
    image varchar(100),
	foreign key (consumableID) references consumable (consumableID),
    foreign key (bevTypeID) references beverage_type (bevTypeID)
	on delete set null on update cascade
);

DROP TABLE IF EXISTS beverage_menu;
CREATE TABLE beverage_menu(
	bevMenuID char(3) primary key,
    beverageID char(3),
    bevSizeID char(3),
	price decimal(7,2) not null,
	foreign key (beverageID) references beverage (beverageID),
    foreign key (bevSizeID) references beverage_size (bevSizeID)
	on delete set null on update cascade
);

DROP TABLE IF EXISTS food_type;
CREATE TABLE food_type(
	foodTypeID char(3) primary key,
    foodTypeName varchar(25) not null
);

DROP TABLE IF EXISTS food;
CREATE TABLE food(
	foodID char(3) primary key,
    consumableID char(3),
    foodTypeID char(3),
    foodName varchar(100) not null,
    foodDesc varchar(255),
    image varchar(100),
    foreign key (consumableID) references consumable (consumableID),
    foreign key (foodTypeID) references food_type (foodTypeID)
	on delete set null on update cascade
);

DROP TABLE IF EXISTS food_menu;
CREATE TABLE food_menu(
	foodMenuID char(3) primary key,
    foodID char(3),
	price decimal(7,2) not null,
    foreign key (foodID) references food (foodID)
	on delete set null on update cascade
);

insert into consumable values('100', 'Beverage');
insert into consumable values('101', 'Food');

insert into beverage_type values('110', 'Coffee');
insert into beverage_type values('111', 'Frappe');
insert into beverage_type values('112', 'Tea');

insert into food_type values('120', 'Cake');
insert into food_type values('121', 'Wrap');
insert into food_type values('122', 'Healthy Treats');

insert into beverage_size values('130', 'Tall');
insert into beverage_size values('131', 'Grande');
insert into beverage_size values('132', 'Venti');

insert into beverage values('140', '100', '110', 'Caffe Misto', 'A one-to-one combination of fresh-brewed coffee and steamed milk add up to one distinctly delicious coffee drink remarkably mixed.', 94, 'assets/beverages/caffe_misto.jpg');
insert into beverage values('141', '100', '111', 'Caramel Cream Frappuccino', 'A rich and creamy blend of caramel syrup milk and ice. Topped with whipped cream and a delicious caramel drizzle.', 250, 'assets/beverages/caramel_cream_frapp.jpg');
insert into beverage values('142', '100', '111', 'Caramel Frappuccino', 'Buttery caramel syrup meets coffee milk and ice for a rendezvous in the blender. Then whipped cream and caramel sauce layer the love on top.', 287, 'assets/beverages/caramel_frapp.jpg');
insert into beverage values('143', '100', '111', 'Chai Tea Cream Frappuccino', 'A creamy blend of spicy chai milk and ice is finished with sweetened whipped cream and a sprinkle of cinnamon. Spice up your afternoon treat.', 240, 'assets/beverages/chai_tea_frapp.jpg');
insert into beverage values('144', '100', '111', 'Chocolate Chip Cream Frappuccino', 'Rich mocha-flavored sauce meets up with chocolaty chips milk and ice for a blender bash. Top it off with sweetened whipped cream and mocha drizzle for a real party in your mouth.', 341, 'assets/beverages/chocolate_chip_frapp.jpg');
insert into beverage values('145', '100', '111', 'Chocolate Cream Frappuccino', 'A rich and creamy blend of chocolate flavoured sauce milk and ice. Topped with whipped cream.', 290, 'assets/beverages/chocolate_cream_frapp.jpg');
insert into beverage values('146', '100', '111', 'Coffee Frappuccino', 'Coffee meets milk and ice in a blender for a rumble and tumble and together they create one of our original Frappuccino® beverages.', 160, 'assets/beverages/coffee_frapp.jpg');
insert into beverage values('147', '100', '111', 'Coffee Jelly Frappuccino', 'A marvel of three delicious layers – innovative coffee jelly creamy chocolate Frappuccino blended with milk coffee and ice finished with a fluffy cloud of whipped cream.', null, 'assets/beverages/coffee_jelly_frapp.jpg');
insert into beverage values('148', '100', '110', 'Cold Brew', 'Handcrafted in small batches daily slow-steeped in cool water for 20 hours without touching heat—Starbucks Cold Brew is made from our custom blend of beans grown to steep long and cold for a super-smooth flavor.', 3, 'assets/beverages/cold_brew.jpg');
insert into beverage values('149', '100', '110', 'Cold Foam Iced Espresso', 'Ice-cold rich espresso poured through creamy cool nonfat milk Cold Foam.', 84, 'assets/beverages/cold_foamiced_espresso.jpg');
insert into beverage values('150', '100', '111', 'Dark Caramel Coffee Frappuccino', 'Dark caramel coffee Frappuccino is topped with buttery dark caramel sauce and layered between signature whipped cream infused with cold brew dark caramel sauce and white chocolate mocha and a dollop of dark caramel sauce at the bottom of the cup.', 350, 'assets/beverages/dark_caramel_frapp.jpg');
insert into beverage values('151', '100', '110', 'Dark Caramel Nitro Cold Brew', 'Nonfat milk Cold Foam elevates our Nitro Cold Brew with a touch of creaminess and flavor. The drink is finished with a strike of Turkish coffee ground.', null, 'assets/beverages/dark_caramel_nitro.jpg');
insert into beverage values('152', '100', '111', 'Dark Mocha Frappuccino', 'For serious chocolate lovers: We blend dark cocoa with milk ice and coffee for an extraordinarily chocolatey experience that\'s then topped with a swirl of whipped cream.', 330, 'assets/beverages/dark_mocha_frapp.jpg');
insert into beverage values('153', '100', '111', 'Espresso Frappuccino', 'Coffee is combined with a shot of espresso and milk then blended with ice to give you a nice little jolt and lots of sipping joy.', 140, 'assets/beverages/espresso_frapp.jpg');
insert into beverage values('154', '100', '110', 'Flat White', 'Bold ristretto shots of espresso get the perfect amount of steamed whole milk to create a not too strong not too creamy just right flavor finished with a beautiful dot.', 155, 'assets/beverages/flat_white.jpg');
insert into beverage values('155', '100', '112', 'Full Leaf Brewed Tea', 'Enjoy a new tea experience in our stores or in the comfort of their own home through a curated selection of packaged full leaf tea sachets.', 0, 'assets/beverages/full_leaf_tea.jpg');
insert into beverage values('156', '100', '111', 'Green Tea Cream Frappuccino', 'We blend sweetened premium matcha green tea milk and ice and top it with sweetened whipped cream to give you a delicious boost of energy.', 300, 'assets/beverages/green_tea_frapp.jpg');
insert into beverage values('157', '100', '110', 'Hot Brewed Coffee', 'Swing by and warm up while enjoying any of our three roasts brewed daily.', 4, 'assets/beverages/hot_brewed.jpg');
insert into beverage values('158', '100', '110', 'Iced Americano', 'Espresso shots are topped with water to produce a light layer of crema then served over ice. The result is this wonderfully rich cup with depth and nuance.', 11, 'assets/beverages/iced_americano.jpg');
insert into beverage values('159', '100', '112', 'Iced Black Tea Latte', 'A select blend of rich full leaf black teas from India and Sri Lanka are lightly sweetened with liquid cane sugar and topped with steamed milk and a velvety foam.', 149, 'assets/beverages/iced_black_tea.jpg');
insert into beverage values('160', '100', '110', 'Iced Caffe Latte', 'Our dark rich espresso is combined with milk and served over ice.', 119, 'assets/beverages/iced_caffe_latte.jpg');
insert into beverage values('161', '100', '110', 'Iced Caffe Mocha', 'Espresso combined with bittersweet mocha sauce and milk over ice. Topped with sweetened whipped cream.', 273, 'assets/beverages/iced_caffe_mocha.jpg');
insert into beverage values('162', '100', '110', 'Iced Cappuccino', 'Dark rich espresso lies in wait under a smoothed and stretched layer of thick milk foam. An alchemy of barista artistry and craft.', 100, 'assets/beverages/iced_capuccino.jpg');
insert into beverage values('163', '100', '110', 'Iced Caramel Macchiato', 'We combine our rich full-bodied espresso with vanilla-flavored syrup milk and ice then top it off with caramel drizzle for an oh-so-sweet finish.', 178, 'assets/beverages/iced_caramel.jpg');
insert into beverage values('164', '100', '112', 'Iced Chai Tea Latte', 'Black tea infused with cinnamon clove and other warming spices is combined with milk and ice.', 192, 'assets/beverages/iced_chai_tea.jpg');
insert into beverage values('165', '100', '112', 'Iced Green Tea Latte', 'Smooth and creamy matcha is lightly sweetened and served with milk and ice.', 184, 'assets/beverages/iced_green_tea.jpg');
insert into beverage values('166', '100', '112', 'Iced Shaken Hibiscus Tea', 'This refreshing beverage combines our hibiscus Starbucks Teavana tea and bursting pearls of real pomegranate juice for a kick of tart flavor.', 85, 'assets/beverages/iced_hibiscus_tea.jpg');
insert into beverage values('167', '100', '112', 'Iced Matcha Tea', 'Our fine Matcha powder layered with steamed milk and our Espresso Roast creates a beautiful layered beverage and is an inventive combination of coffee and tea over ice.', 83, 'assets/beverages/iced_matcha_tea.jpg');
insert into beverage values('168', '100', '112', 'Iced Shaken Black Tea', 'Combines a traditional western black tea experience with a creative twist that is delicious with bits of pomelo fruit grapefruit and honey for a touch of added sweetness.', 118, 'assets/beverages/iced_shaken_black_tea.jpg');
insert into beverage values('169', '100', '112', 'Iced Shaken Tea', 'Experience a more modern take on tea that brings out refreshing bold and vibrant flavors through iced shaken teas.', 0, 'assets/beverages/iced_shaken_tea.jpg');
insert into beverage values('170', '100', '112', 'Iced Vanilla Tea', 'Slightly sweetened vanilla ice-cold espresso poured through a distinct layer of surprisingly creamy nonfat milk cold foam with Shaken Black Tea and Coffee Jelly.', null, 'assets/beverages/iced_vanilla_tea.jpg');
insert into beverage values('171', '100', '110', 'Iced White Chocolate Mocha', 'Our signature espresso meets white chocolate sauce milk and ice then is finished off with sweetened whipped cream in this white chocolate delight.', 310, 'assets/beverages/iced_whitechocolate_mocha.jpg');
insert into beverage values('172', '100', '111', 'Java Chip Frappuccino', 'We blend mocha sauce and Frappuccino chips with Frappuccino roast coffee and milk and ice then top with whipped cream and mocha drizzle to bring you endless java joy.', 322, 'assets/beverages/java_chip_frapp.jpg');
insert into beverage values('173', '100', '111', 'Mocha Frappuccino', 'Mocha sauce Frappuccino roast coffee milk and ice all come together for a mocha flavor that\'ll leave you wanting more.', 272, 'assets/beverages/mocha_frapp.jpg');
insert into beverage values('174', '100', '110', 'Nitro Cold Brew', 'Our small-batch cold brew—slow-steeped for a super smooth taste—gets even better. We\'re infusing it with nitrogen for a naturally sweet flavor and cascading velvety crema. Perfection is served.', 17, 'assets/beverages/nitro_cold.jpg');
insert into beverage values('175', '100', '110', 'Nitro Vanilla Cold Brew', 'Served cold straight from the tap our Nitro Cold Brew is topped with a float of house-made vanilla sweet cream. The result: a cascade of velvety coffee that is more sippable than ever.', 93, 'assets/beverages/nitro_vanilla.jpg');
insert into beverage values('176', '100', '110', 'Salted Caramel Cold Brew', 'Our Signature Starbucks Cold Brew flavored with salted caramel syrup with a salted caramel flavored foam and drizzle of caramel syrup to finish the drink.', 160, 'assets/beverages/salted_caramel.jpg');
insert into beverage values('177', '100', '111', 'Strawberries & Cream Frappuccino', 'Strawberries and milk are blended with ice and topped with a swirl of whipped cream. Sip on the crème of the crop.', 300, 'assets/beverages/strawberries_cream_frapp.jpg');
insert into beverage values('178', '100', '111', 'Triple Mocha Frappuccino', 'Your favorite Mocha Frappuccino is topped with rich dark mocha sauce and layered between the signature whipped cream infused with cold brew dark caramel sauce and white chocolate mocha and a dollop of dark mocha sauce at the bottom of the cup.', null, 'assets/beverages/triple_mocha_frapp.jpg');
insert into beverage values('179', '100', '111', 'Vanilla Cream Frappuccino', 'This rich and creamy blend of vanilla bean milk and ice topped with whipped cream takes va-va-vanilla flavor to another level.', 233, 'assets/beverages/vanilla_cream_frapp.jpg');
insert into beverage values('180', '100', '110', 'Vanilla Sweet Cream Cold Brew', 'Just before serving our slow-steeped custom blend Cold Brew is topped with a delicate float of house-made vanilla sweet cream that cascades throughout the cup.', 92, 'assets/beverages/vanilla_sweet_cream.jpg');
insert into beverage values('181', '100', '111', 'White Chocolate Cream Frappuccino', 'A smooth blend of white chocolate sauce milk and ice and topped with whipped cream for a flavor that wows.', 267, 'assets/beverages/white_chocolate_frapp.jpg');
insert into beverage values('182', '100', '111', 'White Mocha Frappuccino', 'White chocolate Frappuccino roast coffee milk and ice get together for what might be the best thing that happens to you all day. Oh and there\'s whipped cream on top.', 305, 'assets/beverages/white_mocha_frapp.jpg');

insert into beverage_menu values('150', '140', '130', 110.00);
insert into beverage_menu values('151', '140', '131', 125.00);
insert into beverage_menu values('152', '140', '132', 140.00);

insert into beverage_menu values('153', '141', '130', 155.00);
insert into beverage_menu values('154', '141', '131', 170.00);
insert into beverage_menu values('155', '141', '132', 185.00);

insert into beverage_menu values('156', '142', '130', 155.00);
insert into beverage_menu values('157', '142', '131', 170.00);
insert into beverage_menu values('158', '142', '132', 185.00);

insert into beverage_menu values('159', '143', '130', 155.00);
insert into beverage_menu values('160', '143', '131', 170.00);
insert into beverage_menu values('161', '143', '132', 185.00);

insert into beverage_menu values('162', '144', '130', 170.00);
insert into beverage_menu values('163', '144', '131', 185.00);
insert into beverage_menu values('164', '144', '132', 200.00);

insert into beverage_menu values('165', '145', '130', 170.00);
insert into beverage_menu values('166', '145', '131', 185.00);
insert into beverage_menu values('167', '145', '132', 200.00);

insert into beverage_menu values('168', '146', '130', 150.00);
insert into beverage_menu values('169', '146', '131', 165.00);
insert into beverage_menu values('170', '146', '132', 180.00);

insert into beverage_menu values('171', '147', '130', 170.00);
insert into beverage_menu values('172', '147', '131', 185.00);
insert into beverage_menu values('173', '147', '132', 200.00);

insert into beverage_menu values('174', '148', '130', 150.00);
insert into beverage_menu values('175', '148', '131', 165.00);
insert into beverage_menu values('176', '148', '132', 180.00);

insert into beverage_menu values('177', '149', '130', 170.00);
insert into beverage_menu values('178', '149', '131', 185.00);
insert into beverage_menu values('179', '149', '132', 200.00);

insert into beverage_menu values('180', '150', '130', 170.00);
insert into beverage_menu values('181', '150', '131', 185.00);
insert into beverage_menu values('182', '150', '132', 200.00);

insert into beverage_menu values('183', '151', '130', 150.00);
insert into beverage_menu values('184', '151', '131', 165.00);
insert into beverage_menu values('185', '151', '132', 180.00);

insert into beverage_menu values('186', '152', '130', 180.00);
insert into beverage_menu values('187', '152', '131', 195.00);
insert into beverage_menu values('188', '152', '132', 210.00);

insert into beverage_menu values('189', '153', '130', 150.00);
insert into beverage_menu values('190', '153', '131', 165.00);
insert into beverage_menu values('191', '153', '132', 180.00);

insert into beverage_menu values('192', '154', '130', 165.00);
insert into beverage_menu values('193', '154', '131', 180.00);
insert into beverage_menu values('194', '154', '132', 195.00);

insert into beverage_menu values('195', '155', '130', 120.00);
insert into beverage_menu values('196', '155', '131', 120.00);
insert into beverage_menu values('197', '155', '132', 135.00);

insert into beverage_menu values('198', '156', '130', 170.00);
insert into beverage_menu values('199', '156', '131', 185.00);
insert into beverage_menu values('200', '156', '132', 200.00);

insert into beverage_menu values('201', '157', '130', 110.00);
insert into beverage_menu values('202', '157', '131', 125.00);
insert into beverage_menu values('203', '157', '132', 140.00);

insert into beverage_menu values('204', '158', '130', 130.00);
insert into beverage_menu values('205', '158', '131', 145.00);
insert into beverage_menu values('206', '158', '132', 160.00);

insert into beverage_menu values('207', '159', '130', 140.00);
insert into beverage_menu values('208', '159', '131', 155.00);
insert into beverage_menu values('209', '159', '132', 170.00);

insert into beverage_menu values('210', '160', '130', 140.00);
insert into beverage_menu values('211', '160', '131', 155.00);
insert into beverage_menu values('212', '160', '132', 170.00);

insert into beverage_menu values('213', '161', '130', 155.00);
insert into beverage_menu values('214', '161', '131', 170.00);
insert into beverage_menu values('215', '161', '132', 185.00);

insert into beverage_menu values('216', '162', '130', 140.00);
insert into beverage_menu values('217', '162', '131', 155.00);
insert into beverage_menu values('218', '162', '132', 170.00);

insert into beverage_menu values('219', '163', '130', 165.00);
insert into beverage_menu values('220', '163', '131', 180.00);
insert into beverage_menu values('221', '163', '132', 195.00);

insert into beverage_menu values('222', '164', '130', 155.00);
insert into beverage_menu values('223', '164', '131', 170.00);
insert into beverage_menu values('224', '164', '132', 185.00);

insert into beverage_menu values('225', '165', '130', 155.00);
insert into beverage_menu values('226', '165', '131', 170.00);
insert into beverage_menu values('227', '165', '132', 185.00);

insert into beverage_menu values('228', '166', '130', 140.00);
insert into beverage_menu values('229', '166', '131', 155.00);
insert into beverage_menu values('230', '166', '132', 170.00);

insert into beverage_menu values('231', '167', '130', 155.00);
insert into beverage_menu values('232', '167', '131', 170.00);
insert into beverage_menu values('233', '167', '132', 185.00);

insert into beverage_menu values('234', '168', '130', 125.00);
insert into beverage_menu values('235', '168', '131', 140.00);
insert into beverage_menu values('236', '168', '132', 155.00);

insert into beverage_menu values('237', '169', '130', 125.00);
insert into beverage_menu values('238', '169', '131', 140.00);
insert into beverage_menu values('239', '169', '132', 155.00);

insert into beverage_menu values('240', '170', '130', 155.00);
insert into beverage_menu values('241', '170', '131', 170.00);
insert into beverage_menu values('242', '170', '132', 185.00);

insert into beverage_menu values('243', '171', '130', 155.00);
insert into beverage_menu values('244', '171', '131', 170.00);
insert into beverage_menu values('245', '171', '132', 185.00);

insert into beverage_menu values('246', '172', '130', 170.00);
insert into beverage_menu values('247', '172', '131', 185.00);
insert into beverage_menu values('248', '172', '132', 200.00);

insert into beverage_menu values('249', '173', '130', 155.00);
insert into beverage_menu values('250', '173', '131', 170.00);
insert into beverage_menu values('251', '173', '132', 185.00);

insert into beverage_menu values('252', '174', '130', 150.00);
insert into beverage_menu values('253', '174', '131', 165.00);
insert into beverage_menu values('254', '174', '132', 180.00);

insert into beverage_menu values('255', '175', '130', 150.00);
insert into beverage_menu values('256', '175', '131', 165.00);
insert into beverage_menu values('257', '175', '132', 180.00);

insert into beverage_menu values('258', '176', '130', 150.00);
insert into beverage_menu values('259', '176', '131', 165.00);
insert into beverage_menu values('260', '176', '132', 180.00);

insert into beverage_menu values('261', '177', '130', 150.00);
insert into beverage_menu values('262', '177', '131', 165.00);
insert into beverage_menu values('263', '177', '132', 180.00);

insert into beverage_menu values('264', '178', '130', 170.00);
insert into beverage_menu values('265', '178', '131', 185.00);
insert into beverage_menu values('266', '178', '132', 200.00);

insert into beverage_menu values('267', '179', '130', 150.00);
insert into beverage_menu values('268', '179', '131', 165.00);
insert into beverage_menu values('269', '179', '132', 195.00);

insert into beverage_menu values('270', '180', '130', 150.00);
insert into beverage_menu values('271', '180', '131', 165.00);
insert into beverage_menu values('272', '180', '132', 180.00);

insert into beverage_menu values('273', '181', '130', 150.00);
insert into beverage_menu values('274', '181', '131', 165.00);
insert into beverage_menu values('275', '181', '132', 195.00);

insert into beverage_menu values('276', '182', '130', 155.00);
insert into beverage_menu values('277', '182', '131', 170.00);
insert into beverage_menu values('278', '182', '132', 185.00);

-- Food Type
-- 120 - Cake
-- 121 - Wrap
-- 122 - Healthy Treats

insert into food values('160', '101', '122', 'Berry Chia Overnight Oats', 'Made with whole milk Greek yogurt rolled oats dried cranberries dried blueberries chia seeds sliced almonds and pistachios just for you!', 'assets/food/berry_chia_oats.jpeg');
insert into food values('161', '101', '120', 'Blueberry Licious Cheesecake', 'A silken smooth yet light cheesecake swirled with blueberries bursting with flavors. Finished with sweet-tangy blueberry compote. A refreshing dessert!', 'assets/food/blueberry_cheesecake.jpg');
insert into food values('162', '101', '120', 'Carrotita Cake', 'Moist Bundt carrot cake with swirls of smooth creamy cheesecake filing finished with cream cheese frosting and topped with chopped walnuts.', 'assets/food/carrotita_cake.jpeg');
insert into food values('163', '101', '121', 'Chicken Barbeque', 'Soft and cheesy corn bread with sliced moist tender chicken breast tossed in BBQ sauce.', 'assets/food/chicken_bbq.jpg');
insert into food values('164', '101', '121', 'Roasted Chicken Pesto', 'Crusty and soft flat bread filled with juicy roasted sliced chicken breast fillet sauted shiitake mushroom Emmental cheese and pesto mayo sauce.', 'assets/food/chicken_pesto.jpg');
insert into food values('165', '101', '120', 'Classic Chocolate Cake', 'Buttery caramel fudge and silky smooth chocolate sandwiched between layers of dark chocolate cake and finished with chocolate ganache.', 'assets/food/chocolate_cake.jpg');
insert into food values('166', '101', '120', 'Chocolate Cream Marble Cheesecake', 'Creamy cheesecake marbled with smooth and creamy chocolate cheese finished with creamy chocolate frosting.', 'assets/food/chocolate_cream_cake.jpeg');
insert into food values('167', '101', '122', 'Fruit Cup', 'A delicious medley of apples grapes pineapples and honey dew. Full of nutrients and wholesome goodness.', 'assets/food/fruit_cup.jpeg');
insert into food values('168', '101', '121', 'Ham and Cheese Toastie', 'A layered toasted Italian bread comprising of melted cheddar mozzarella and gruyere cheese bechamel and slices of hone ham and mortadella', 'assets/food/ham_and_cheese.jpg');
insert into food values('169', '101', '122', 'Mango Greek Yogurt Parfait', 'Creamy Greek Yogurt layered with sweet mango compote and topped with crunchy oat granola.', 'assets/food/mango_greek_yogurt.jpeg');
insert into food values('170', '101', '120', 'New York Cheesecake', 'Smooth and velvety cheescake is a slice of heaven.', 'assets/food/ny_cheesecake.jpg');
insert into food values('171', '101', '122', 'Starbucks Perfect Oatmeal', 'A blend of rolled and steel-cut oats with dried fruit a nut medley and brown sugar as optional toppings. Hearty. Traditional. Classic.', 'assets/food/oatmeal.jpeg');
insert into food values('172', '101', '121', 'Patty Melt', 'It\'s a smash up of a perfect grilled cheese sandwich melded with a juicy burger.', 'assets/food/patty_melt.jpg');
insert into food values('173', '101', '122', 'Pomelo', 'Fresh pomelo.', 'assets/food/pomelo.jpeg');
insert into food values('174', '101', '121', 'Roasted Chicken and Feta Sandwich', 'Flavors of feta sun-dried tomatoes bell peppers and roasted chicken on a crusty bread.', 'assets/food/roasted_chicken.jpeg');
insert into food values('175', '101', '121', 'Salmon Dill w/ Egg', 'Salmon flakes cream cheese and mozzarella cheese on a multigrain bread.', 'assets/food/salmon_dill.jpg');
insert into food values('176', '101', '121', 'Spanish Chorizo', 'Smokey sliced Spanish chorizo milky egg patty and gooey mozzarella cheese on Soft whole wheat pandesal.', 'assets/food/spanish_chorizo.jpg');
insert into food values('177', '101', '121', 'Turkey Ham', 'Slow-roasted turkey ham fluffy herbed white omelette and nutty Fontina cheese on soft and chewy whole wheat englilsh muffin.', 'assets/food/turkey_ham.jpg');
insert into food values('178', '101', '121', 'Roasted Vegetable Frittata', 'Vegetarian and protein rich this sandwich is bound to be tasty start to any morning.', 'assets/food/vegetable_frittata.jpg');

insert into food_menu values('170', '160', 115.00);
insert into food_menu values('171', '161', 170.00);
insert into food_menu values('172', '162', 165.00);
insert into food_menu values('173', '163', 165.00);
insert into food_menu values('174', '164', 195.00);
insert into food_menu values('175', '165', 170.00);
insert into food_menu values('176', '166', 185.00);
insert into food_menu values('177', '167', 105.00);
insert into food_menu values('178', '168', 205.00);
insert into food_menu values('179', '169', 135.00);
insert into food_menu values('180', '170', 185.00);
insert into food_menu values('181', '171', 125.00);
insert into food_menu values('182', '172', 165.00);
insert into food_menu values('183', '173', 105.00);
insert into food_menu values('184', '174', 205.00);
insert into food_menu values('185', '175', 195.00);
insert into food_menu values('186', '176', 165.00);
insert into food_menu values('187', '177', 165.00);
insert into food_menu values('188', '178', 165.00);

select * from consumable;

select * from beverage;
select * from beverage_type;
select * from beverage_size;
select * from beverage_menu;

select b.beverageID, beverageName, s.bevSizeName, m.price from beverage b
inner join beverage_menu m on b.beverageID = m.beverageID
inner join beverage_size s on m.bevSizeID = s.bevSizeID
where b.beverageID = '141';

select * from food;
select * from food_type;
select * from food_menu;
