Script: "prettier": "prettier --config .prettierrc "src//_.ts" --write", "build": "npx tsc", "start": "nodemon src/index.ts", "jasmine": "jasmine", "test": "npm run build && npm run jasmine", "lint": "eslint "//_.ts" --ignore-pattern node_modules/"

Endpoint: Normal link: http://localhost:3000/resizes?filename=fjord&width=100&height=100 \*\* filename should be the name of any image file in image asset folder from Udacity Error link: http://localhost:3000/resizes?filename=fjord http://localhost:3000/resizes?filename=fjord&width=a&height=b
