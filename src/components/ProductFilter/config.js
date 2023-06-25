export const filterInitialState = {
        category: 'all',
        brand: 'all',
        priceFrom: 0,
        priceTo: Infinity,
    }


export const filterConfig = [
    {
        id: 'category',
        filterRule: (value, item) => {
            return value === 'all' || value === item.category;
        }
    },
    {
        id: 'priceFrom',
        filterRule: (value, item) => {
            return item.price >= value;
        }
    },
    {
        id: 'priceTo',
        filterRule: (value, item) => {
            return item.price <= value;
        }
    }
]

// const config = [
//     {
//       id: 'images',
//       title: 'Image'
//     },
//     {
//       id: 'title',
//       title: 'Name',
//       sort (a, b) {
//         return a.localeCompare(b, ['ru', 'en']);
//       }
//     },
//     {
//       id: 'sales',
//       title: 'Sales',
//       sort (a, b) {
//         return a - b;
//       }
//     }
//   ];

// const sortData = (field, order) => {
//     const column = this.config.find(item => item.id === field);
    
//     if (!column.sort) return;
    
//     const directions = {
//       asc: 1,
//       desc: -1
//     };
//     const direction = directions[order];

//     return [...this.data].sort((a, b) => {
//       return direction * column.sort(a, b);
//     });
//   }