export type CatalogueItemData = {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image?: string;
  peanut_free?: boolean;
  gluten_free?: boolean;
  dairy_free?: boolean;
  kosher?: boolean;
  halal?: boolean;
  vegan?: boolean;
  vegetarian?: boolean;
  type?: 'drink' | 'snack' | 'other' | 'food' | 'sandwich' | 'dessert' | string;
  [key: string]: unknown;
};

export { fetchCatalogueData };

const fetchCatalogueData = async (): Promise<CatalogueItemData[]> => {
  // Simulate an API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return catalogueData as CatalogueItemData[];
};

const catalogueData: CatalogueItemData[] = [
  {
    id: 1,
    name: 'Coca-Cola',
    description: 'A refreshing carbonated soft drink with a classic cola flavor.',
    price: 1.5,
    image: 'https://images.unsplash.com/photo-1598514983337-fd15ae363736?auto=format&fit=crop&w=800&q=80',
    vegan: true,
    vegetarian: true,
    gluten_free: true,
    dairy_free: true,
    peanut_free: true,
    kosher: true,
    halal: true,
    type: 'drink',
  },
  {
    id: 2,
    name: 'Pepsi',
    description: 'Crisp and bubbly cola with an energetic finish.',
    price: 1.45,
    image: 'https://images.unsplash.com/photo-1585386959984-a415522a55f1?auto=format&fit=crop&w=800&q=80',
    vegan: true,
    vegetarian: true,
    gluten_free: true,
    dairy_free: true,
    peanut_free: true,
    kosher: true,
    halal: true,
    type: 'drink',
  },
  {
    id: 3,
    name: 'Orange Soda',
    description: 'Sweet citrus soda with bright orange flavor and fizz.',
    price: 1.3,
    image: 'https://images.unsplash.com/photo-1568642702658-f313e9c98d1d?auto=format&fit=crop&w=800&q=80',
    vegan: true,
    vegetarian: true,
    gluten_free: true,
    dairy_free: true,
    peanut_free: true,
    kosher: true,
    halal: true,
    type: 'drink',
  },
  {
    id: 4,
    name: 'Iced Tea',
    description: 'Smooth brewed iced tea with a hint of lemon.',
    price: 1.75,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    vegan: true,
    vegetarian: true,
    gluten_free: true,
    dairy_free: true,
    peanut_free: true,
    kosher: true,
    halal: true,
    type: 'drink',
  },
  {
    id: 5,
    name: 'Chocolate Shake',
    description: 'Creamy chocolate milkshake topped with whipped cream.',
    price: 2.4,
    image: 'https://images.unsplash.com/photo-1572373129673-93a7f6751d85?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    dairy_free: false,
    gluten_free: true,
    peanut_free: false,
    kosher: true,
    halal: true,
    type: 'drink',
  },
  {
    id: 6,
    name: 'Sparkling Water',
    description: 'Light and refreshing sparkling water with natural minerals.',
    price: 1.2,
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80',
    vegan: true,
    vegetarian: true,
    gluten_free: true,
    dairy_free: true,
    peanut_free: true,
    kosher: true,
    halal: true,
    type: 'drink',
  },
];