# HRNEt Table Generator

## requirement
1. You need node and npm installed globally on your computer
2. This npm package is intended to be used by a react project.

### How to install ?

- using npm: in the command line interface use the following:
- npm i hrnet-tablegenerator

### How to use ?
In the container or component where you want to use the tablegenerator:

1. First import the component from the node_modules package folder:
```
import { TableGenerator } from "hrnet-tablegenerator";
```

2. Secondly, Format your data to be used by the tablegenerator component:
- the object needs to be formatted with two properties, columns and nodes
- the columns property is an array of object with two property key and label (it's used to determined the columns and the functionnality of the component)
- the nodes property is an array of "rows" object consisting in objects, which property exactly ! match the key of the columns object !

example: 
```
const tableNodes = {
	columns: [
	      {
		key: "firstName",
		label: "First Name",
	      },
	      {
		key: "lastName",
		label: "Last Name",
	      }
      ],
	nodes: [
		{
			"firstName": "Jean",
			"lastName" : "Dupont"
		  },
		  {
			"firstName": "Josie",
			"lastName" : "Franquiche"
		  }
	  ]
};
```

3. Thirdly, the component need to be passed an object into it's data props, like so:
```
<TableGenerator data={tableNodes} />
```
