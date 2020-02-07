# Vue Duallistbox

Yet another multi selection box for Vue.

## Getting Started

```bash
npm install vue-multiselection-box --save
```

Demo: https://codesandbox.io/s/cool-https-sc1pk?fontsize=14&hidenavigation=1&theme=dark

Template part:
```html
<div id="app">
    <MultiSelectionBox
      :base-list="baseList"
      :selected-list="selectedList"
      @updateBase="baseList = $event"
      @updateSelected="selectedList = $event"
      :isSortable="false"
    />
  </div>
```

Script part:
```javascript
import MultiSelectionBox from "vue-multiselection-box";

export default {
  name: "App",
  components: {
    MultiSelectionBox
  },
  data: () => ({
    baseList: [
      { id: 1, name: "Person 1" },
      { id: 3, name: "Person 3" },
      { id: 4, name: "Person 4" },
      { id: 5, name: "Person 5" }
    ],
    selectedList: [
      { id: 2, name: "Person 2" },
      { id: 6, name: "Person 6" },
      { id: 7, name: "Person 7" }
    ]
  })
};
```


### Prerequisites

TODO

### Installing

TODO

## Testing

TODO

## Deployment

TODO

## Built With

TODO

## Contributing

TODO

## Versioning

Initial version

## Authors

* **Levent Anil Ozen** - *Initial work* - [Levent Anil Ozen](https://github.com/leventozen)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

TODO
