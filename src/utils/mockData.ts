import { Recipe } from '../models';

const mockRecipes: Recipe[] = [
    {
        id: '1',
        title: 'Libum (Roman Cheesecake)',
        era: ['Ancient Rome'],
        description: 'A traditional Roman sacrificial cake, often offered to household spirits during religious ceremonies.',
        originalIngredients: [
            {
                name: 'Sheep\'s milk ricotta',
                quantity: '1 pound',
                historicalNote: 'Romans used fresh sheep\'s milk cheese'
            },
            {
                name: 'Flour',
                quantity: '1 cup',
                historicalNote: 'Usually wheat flour, ground coarsely'
            },
            {
                name: 'Egg',
                quantity: '1',
                historicalNote: 'Chicken eggs were smaller in Roman times'
            },
            {
                name: 'Bay leaves',
                quantity: '6 leaves',
                historicalNote: 'Used as a bed for baking'
            },
            {
                name: 'Honey',
                quantity: '2 tablespoons',
                historicalNote: 'Honey was the primary sweetener in Roman cuisine'
            }
        ],
        modernSubstitutes: [
            {
                original: 'Sheep\'s milk ricotta',
                substitute: 'Regular ricotta cheese',
                substitutionReason: 'More commonly available in modern stores'
            },
            {
                original: 'Coarse wheat flour',
                substitute: 'All-purpose flour',
                substitutionReason: 'Similar texture when baked'
            }
        ],
        cookingSteps: [
            {
                description: 'Mix the ricotta and flour together in a bowl',
                duration: 5,
                toolSuggestion: 'Wooden spatula',
                historicalVideo: '/assets/videos/roman_mixing.mp4'
            },
            {
                description: 'Beat the egg and incorporate into the cheese mixture',
                duration: 3,
                toolSuggestion: 'Whisk',
                historicalVideo: '/assets/videos/roman_egg_beating.mp4'
            },
            {
                description: 'Form the mixture into a cake about 2 inches thick',
                duration: 5,
                toolSuggestion: 'Hands',
                historicalVideo: '/assets/videos/roman_cake_forming.mp4'
            },
            {
                description: 'Place the cake on bay leaves on a baking stone',
                duration: 2,
                toolSuggestion: 'Stone baking surface',
                image: '/assets/images/libum_on_leaves.jpg'
            },
            {
                description: 'Cover with a dome lid (testum) and place hot coals on top, or bake in a modern oven at 375°F',
                duration: 40,
                toolSuggestion: 'Testum dome or modern oven',
                historicalVideo: '/assets/videos/roman_testum_baking.mp4'
            },
            {
                description: 'Warm the honey and drizzle over the warm cake before serving',
                duration: 3,
                toolSuggestion: 'Small pot and spoon',
                image: '/assets/images/libum_with_honey.jpg'
            }
        ],
        accuracyRating: 4.7,
        flavorRating: 4.2,
        imageUrl: '/assets/images/libum_main.jpg',
        createdAt: new Date('2023-04-12'),
        updatedAt: new Date('2023-05-20')
    },
    {
        id: '2',
        title: 'Medieval Beef and Ale Pie',
        era: ['Medieval'],
        description: 'A hearty meat pie flavored with ale and spices, popular during feasts in medieval England.',
        originalIngredients: [
            {
                name: 'Beef',
                quantity: '2 pounds',
                historicalNote: 'Often tougher cuts like shoulder or shank'
            },
            {
                name: 'Ale',
                quantity: '2 cups',
                historicalNote: 'Medieval ale was less hoppy and more malt-forward'
            },
            {
                name: 'Suet',
                quantity: '1/2 cup',
                historicalNote: 'Beef fat used for richness and pastry making'
            },
            {
                name: 'Saffron',
                quantity: '1 pinch',
                historicalNote: 'Expensive spice used by nobility'
            },
            {
                name: 'Ginger',
                quantity: '1 teaspoon',
                historicalNote: 'Imported from the East, sign of wealth'
            },
            {
                name: 'Flour',
                quantity: '3 cups',
                historicalNote: 'Often mixed grains, not purely wheat'
            }
        ],
        modernSubstitutes: [
            {
                original: 'Suet',
                substitute: 'Butter or vegetable shortening',
                substitutionReason: 'Easier to work with and more commonly available'
            },
            {
                original: 'Medieval ale',
                substitute: 'Brown ale or stout',
                substitutionReason: 'Similar malt-forward flavor'
            }
        ],
        cookingSteps: [
            {
                description: 'Cut beef into small pieces and brown in a pot over fire',
                duration: 15,
                toolSuggestion: 'Cast iron pot',
                historicalVideo: '/assets/videos/medieval_browning.mp4'
            },
            {
                description: 'Add ale and bring to a simmer',
                duration: 5,
                toolSuggestion: 'Ladle',
                image: '/assets/images/medieval_ale_adding.jpg'
            },
            {
                description: 'Add spices and simmer until meat is tender (about 2 hours)',
                duration: 120,
                toolSuggestion: 'Fire management tools',
                historicalVideo: '/assets/videos/medieval_simmering.mp4'
            },
            {
                description: 'Make pastry by mixing flour with water and suet',
                duration: 20,
                toolSuggestion: 'Wooden board and hands',
                image: '/assets/images/medieval_pastry_making.jpg'
            },
            {
                description: 'Line a pie dish with 2/3 of the pastry',
                duration: 10,
                toolSuggestion: 'Pie dish',
                historicalVideo: '/assets/videos/medieval_pie_lining.mp4'
            },
            {
                description: 'Fill with meat mixture and cover with remaining pastry',
                duration: 10,
                toolSuggestion: 'Knife for cutting air vents',
                image: '/assets/images/medieval_pie_filling.jpg'
            },
            {
                description: 'Bake in a hot oven until golden brown',
                duration: 45,
                toolSuggestion: 'Stone oven or modern oven at 375°F',
                historicalVideo: '/assets/videos/medieval_pie_baking.mp4'
            }
        ],
        accuracyRating: 4.5,
        flavorRating: 4.8,
        imageUrl: '/assets/images/medieval_pie_main.jpg',
        createdAt: new Date('2023-02-08'),
        updatedAt: new Date('2023-03-15')
    },
    {
        id: '3',
        title: 'Renaissance Orange and Almond Cake',
        era: ['Renaissance'],
        description: 'A delicate cake featuring the exotic citrus flavors that became popular during the Renaissance period.',
        originalIngredients: [
            {
                name: 'Oranges',
                quantity: '3 whole',
                historicalNote: 'Bitter oranges were more common in Renaissance kitchens'
            },
            {
                name: 'Almonds',
                quantity: '2 cups',
                historicalNote: 'Ground by hand to varying consistencies'
            },
            {
                name: 'Sugar',
                quantity: '1 cup',
                historicalNote: 'White sugar was a luxury item'
            },
            {
                name: 'Eggs',
                quantity: '6',
                historicalNote: 'From various fowl, not just chickens'
            },
            {
                name: 'Rosewater',
                quantity: '1 tablespoon',
                historicalNote: 'Common Renaissance flavoring'
            }
        ],
        modernSubstitutes: [
            {
                original: 'Bitter oranges',
                substitute: 'Navel oranges with 1 tbsp lemon juice',
                substitutionReason: 'Creates similar sweet-tart flavor profile'
            },
            {
                original: 'Rosewater',
                substitute: 'Vanilla extract',
                substitutionReason: 'More familiar flavor to modern palates'
            }
        ],
        cookingSteps: [
            {
                description: 'Boil whole oranges in water until soft, about 1-2 hours',
                duration: 90,
                toolSuggestion: 'Copper pot',
                historicalVideo: '/assets/videos/renaissance_orange_boiling.mp4'
            },
            {
                description: 'Cut oranges open, remove seeds, and puree the whole fruit',
                duration: 10,
                toolSuggestion: 'Mortar and pestle or food processor',
                image: '/assets/images/renaissance_orange_puree.jpg'
            },
            {
                description: 'Grind almonds to a fine powder',
                duration: 20,
                toolSuggestion: 'Mortar and pestle',
                historicalVideo: '/assets/videos/renaissance_grinding_almonds.mp4'
            },
            {
                description: 'Beat eggs with sugar until light and fluffy',
                duration: 10,
                toolSuggestion: 'Whisk or beating rod',
                image: '/assets/images/renaissance_beating_eggs.jpg'
            },
            {
                description: 'Combine orange puree, ground almonds, and the egg mixture',
                duration: 5,
                toolSuggestion: 'Wooden spoon',
                historicalVideo: '/assets/videos/renaissance_cake_mixing.mp4'
            },
            {
                description: 'Add rosewater and mix gently',
                duration: 2,
                toolSuggestion: 'Glass vial for rosewater',
                image: '/assets/images/renaissance_adding_rosewater.jpg'
            },
            {
                description: 'Pour into a greased cake mold',
                duration: 3,
                toolSuggestion: 'Decorative cake mold',
                historicalVideo: '/assets/videos/renaissance_cake_molding.mp4'
            },
            {
                description: 'Bake in a moderate oven until set',
                duration: 60,
                toolSuggestion: 'Wood-fired oven or modern oven at 350°F',
                image: '/assets/images/renaissance_cake_baking.jpg'
            }
        ],
        accuracyRating: 4.9,
        flavorRating: 4.6,
        imageUrl: '/assets/images/renaissance_cake_main.jpg',
        createdAt: new Date('2023-05-10'),
        updatedAt: new Date('2023-06-18')
    },
    {
        id: '4',
        title: 'Victorian Cucumber Sandwiches',
        era: ['Victorian'],
        description: 'Delicate tea sandwiches that were a staple at Victorian afternoon tea gatherings.',
        originalIngredients: [
            {
                name: 'White bread',
                quantity: '1 loaf',
                historicalNote: 'Pre-sliced bread was not available; bread was cut thinly by hand'
            },
            {
                name: 'Cucumber',
                quantity: '1 large',
                historicalNote: 'English cucumbers were smaller and had more seeds than modern varieties'
            },
            {
                name: 'Butter',
                quantity: '1/4 pound',
                historicalNote: 'Freshly churned and unsalted'
            },
            {
                name: 'Salt',
                quantity: '1 teaspoon',
                historicalNote: 'Fine sea salt was preferred by the upper classes'
            },
            {
                name: 'White pepper',
                quantity: '1/4 teaspoon',
                historicalNote: 'Considered more refined than black pepper'
            }
        ],
        modernSubstitutes: [
            {
                original: 'Handcut white bread',
                substitute: 'Store-bought white sandwich bread',
                substitutionReason: 'Convenience and consistent thickness'
            }
        ],
        cookingSteps: [
            {
                description: 'Peel the cucumber and slice it paper-thin',
                duration: 10,
                toolSuggestion: 'Sharp knife or mandoline',
                historicalVideo: '/assets/videos/victorian_cucumber_slicing.mp4'
            },
            {
                description: 'Lay cucumber slices on a cloth and sprinkle with salt to draw out moisture',
                duration: 30,
                toolSuggestion: 'Linen cloth',
                image: '/assets/images/victorian_salting_cucumber.jpg'
            },
            {
                description: 'Pat the cucumber slices dry with another cloth',
                duration: 5,
                toolSuggestion: 'Clean linen cloth',
                historicalVideo: '/assets/videos/victorian_drying_cucumber.mp4'
            },
            {
                description: 'Slice the bread thinly and evenly',
                duration: 10,
                toolSuggestion: 'Bread knife',
                image: '/assets/images/victorian_bread_slicing.jpg'
            },
            {
                description: 'Butter each slice of bread very thinly, right to the edges',
                duration: 10,
                toolSuggestion: 'Silver butter knife',
                historicalVideo: '/assets/videos/victorian_buttering.mp4'
            },
            {
                description: 'Arrange cucumber slices in a single layer on half the bread slices',
                duration: 5,
                toolSuggestion: 'Silver serving tongs',
                image: '/assets/images/victorian_cucumber_arranging.jpg'
            },
            {
                description: 'Sprinkle with a tiny amount of white pepper',
                duration: 1,
                toolSuggestion: 'Pepper shaker',
                historicalVideo: '/assets/videos/victorian_peppering.mp4'
            },
            {
                description: 'Top with remaining bread slices, butter side down',
                duration: 3,
                toolSuggestion: 'Clean hands',
                image: '/assets/images/victorian_sandwich_assembly.jpg'
            },
            {
                description: 'Cut off crusts and cut sandwiches into triangles or fingers',
                duration: 5,
                toolSuggestion: 'Sharp knife',
                historicalVideo: '/assets/videos/victorian_sandwich_cutting.mp4'
            },
            {
                description: 'Arrange on a silver platter lined with a doily',
                duration: 5,
                toolSuggestion: 'Silver platter and paper doily',
                image: '/assets/images/victorian_sandwich_plating.jpg'
            }
        ],
        accuracyRating: 4.8,
        flavorRating: 4.3,
        imageUrl: '/assets/images/victorian_sandwiches_main.jpg',
        createdAt: new Date('2023-03-22'),
        updatedAt: new Date('2023-04-30')
    }
];

export default mockRecipes; 