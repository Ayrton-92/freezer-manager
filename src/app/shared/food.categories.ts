import { Category } from '../interfaces/category.interface';

const foodCategories: Category[] = [
    {
        id: 'fruits',
        name: 'Fruits',
        maxStayInFreezerInMonth: 12
    },
    {
        id: 'vegetables',
        name: 'Legumes',
        maxStayInFreezerInMonth: 12
    }, {
        id: 'chicken',
        name: 'Poulet',
        maxStayInFreezerInMonth: 6
    }, {
        id: 'pork',
        name: 'Porc',
        maxStayInFreezerInMonth: 6
    }, {
        id: 'lamb',
        name: 'Agneau',
        maxStayInFreezerInMonth: 6
    }, {
        id: 'veal',
        name: 'Veau',
        maxStayInFreezerInMonth: 6
    }, {
        id: 'beef',
        name: 'Boeuf',
        maxStayInFreezerInMonth: 12
    }, {
        id: 'wild-game',
        name: 'Gibier',
        maxStayInFreezerInMonth: 8
    }, {
        id: 'minced-meat',
        name: 'Viande emincées',
        maxStayInFreezerInMonth: 2
    }, {
        id: 'fish-filet',
        name: 'Filet de poisson',
        maxStayInFreezerInMonth: 3
    }, {
        id: 'shell-fish',
        name: 'Fruits de mer',
        maxStayInFreezerInMonth: 3
    }, {
        id: 'ready-meal',
        name: 'Plat préparés',
        maxStayInFreezerInMonth: 3
    }, {
        id: 'bread',
        name: 'Pain',
        maxStayInFreezerInMonth: 1
    }, {
        id: 'cake-mixture',
        name: 'Préparation gateaux',
        maxStayInFreezerInMonth: 2
    }, {
        id: 'batter',
        name: 'Pâte',
        maxStayInFreezerInMonth: 2
    }, {
        id: 'pastry',
        name: 'Pâte feuilletées',
        maxStayInFreezerInMonth: 2
    }, {
        id: 'cake',
        name: 'Gâteaux',
        maxStayInFreezerInMonth: 3
    }, {
        id: 'butter',
        name: 'Beurre',
        maxStayInFreezerInMonth: 3
    }, {
        id: 'gratedCheese',
        name: 'Fromage rapé',
        maxStayInFreezerInMonth: 3
    },
];

export default foodCategories;
