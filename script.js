let template = "ID,Type,SKU,Name,Published,Is featured?,Visibility in catalog,Short description,Description,Date sale price starts,Date sale price ends,Tax status,Tax class,In stock?,Stock,Low stock amount,Backorders allowed?,Sold individually?,Weight (g),Length (cm),Width (cm),Height (cm),Allow customer reviews?,Purchase note,Sale price,Regular price,Categories,Tags,Shipping class,Images,Download limit,Download expiry days,Parent,Grouped products,Upsells,Cross-sells,External URL,Button text,Position,Attribute 1 name,Attribute 1 value(s),Attribute 1 visible,Attribute 1 global,Attribute 2 name,Attribute 2 value(s),Attribute 2 visible,Attribute 2 global,Attribute 3 name,Attribute 3 value(s),Attribute 3 visible,Attribute 3 global,Attribute 4 name,Attribute 4 value(s),Attribute 4 visible,Attribute 4 global,Attribute 5 name,Attribute 5 value(s),Attribute 5 visible,Attribute 5 global,Attribute 6 name,Attribute 6 value(s),Attribute 6 visible,Attribute 6 global,Attribute 7 name,Attribute 7 value(s),Attribute 7 visible,Attribute 7 global,Attribute 8 name,Attribute 8 value(s),Attribute 8 visible,Attribute 8 global,Attribute 3 default,Attribute 9 name,Attribute 9 value(s),Attribute 9 visible,Attribute 9 global";

let num_variations = 0;

const num_fields = template.split(",").length;

function getPlainTextWeight(weight) {
  if (weight >= 1) {
    return weight;
  }
  else {
    return weight * 1000;
  }
}

function submit() {
  let str = "";
  str += "\n\"";
  str += (document.getElementById("id").value + "\",");
  str += "variable,";
  str += document.getElementById("sku").value + ",";
  str += "\"" + document.getElementById("name").value + "\",";
  str += document.getElementById("published").checked ? "1,":"0,";
  str += document.getElementById("featured").checked ? "1,":"0,";
  str += "visible,";
  str += "\"" + document.getElementById("short-description").value + "\",";
  str += "\"" + document.getElementById("description").value + "\",";
  str += ",,"; //date sale start, date sale ends
  str += "taxable,";
  str += ","; //parent? or child
  str += document.getElementById("in-stock").checked ? "1,":"0,"; //in stock
  str += document.getElementById("stock-amount").value + ","; //stock amount
  str += ",,,"; //low stock, backorder, sold individually
  str += document.getElementById("weight").value ? document.getElementById("weight").value : "1" + ","; //weight
  str += ",,,"; //length, width, height
  str += document.getElementById("allow-reviews").checked ? "1,,":"0,,"; //allow reviews
  str += ","; //Sale price
  str += ",\""; //Regular price
  let checkboxes = document.querySelectorAll('input[name="categories[]"]:checked');
  let values = Array.from(checkboxes).map(checkbox => checkbox.value);
  let result = values.join(', ');
  if (!result) {
    result = "Uncategorized";
  }
  str += result + "\","; //categories
  str += ","; //tags,
  str += ",,,,";//shipping class, images, DL limit, DL expiry
  str += ","; //parent, leave blank
  str += ",,,,,"; // Grouped products, upsells, Cross-sells, External URL, Button text
  str += ","; //position
  if (document.getElementById("full-name").value) {
    str += "Full Name,\"" + document.getElementById("full-name").value + "\",1,1,";
  }
  if (document.getElementById("synonyms").value) {
    str += "Synonyms,\"" + document.getElementById("synonyms").value + "\",1,1,";
  }
  if (document.getElementById("item-number").value) {
    str += "Item #,\"" + document.getElementById("item-number").value + "\",1,1,";
  }
  if (document.getElementById("cas").value) {
    str += "CAS,\"" + document.getElementById("cas").value + "\",1,1,";
  }
  if (document.getElementById("mf").value) {
    str += "M.F.,\"" + document.getElementById("mf").value + "\",1,1,";
  }
  if (document.getElementById("mw").value) {
    str += "M.W.,\"" + document.getElementById("mw").value + "\",1,1,";
  }
  if (document.getElementById("appearance").value) {
    str += "Appearance,\"" + document.getElementById("appearance").value + "\",1,1,";
  }
  if (document.getElementById("storage").value) {
    str += "Storage,\"" + document.getElementById("storage").value + "\",1,1";
  }
  let num_curr_fields = str.split(",").length - 1;
  for(let i = num_curr_fields; i < num_fields; i++) {
    str += ",";
  }

  console.log(str);
  template += str;
  document.getElementById("output").innerHTML += str;
  
  //Now deal with variations
  let arr = getVariationValues();
  for (let i = 0; i < arr.length; i++) {
    let v_str = "";
    v_str += "\n\"";
    v_str += (arr[i].id + "\",");
    v_str += "variation ,";
    v_str += ","; //sku
    v_str += "\"" + 
            document.getElementById("name").value + " - " + 
            document.getElementById("sku").value + "-" + 
            getPlainTextWeight(arr[i].weight) +
            arr[i].quality + 
            "\","; //name
    v_str += document.getElementById("published").checked ? "1,":"0,";
    v_str += document.getElementById("featured").checked ? "1,":"0,";
    v_str += "visible,";
    v_str += ","; //short description
    v_str += ","; //long description
    v_str += ",,"; //date sale start, date sale ends
    v_str += "taxable,";
    v_str += "parent,"; //parent? or child
    v_str += document.getElementById("in-stock").checked ? "1,":"0,"; //in stock
    v_str += ","; //stock amount
    v_str += ",,,"; //low stock, backorder, sold individually
    v_str += arr[i].weight + ","; //weight
    v_str += ",,,"; //length, width, height
    v_str += document.getElementById("allow-reviews").checked ? "1,,":"0,,"; //allow reviews
    v_str += arr[i].salePrice + ","; //Sale price
    v_str += arr[i].regularPrice = ","; //Regular price
    v_str += ","; //categories
    v_str += ","; //tags,
    v_str += ",,,,";//shipping class, images, DL limit, DL expiry
    v_str += document.getElementById("sku").value + ","; //parent
    v_str += ",,,,,"; // Grouped products, upsells, Cross-sells, External URL, Button text
    v_str += i + ","; //position
    v_str += "Item #,"
    v_str += document.getElementById("sku").value + "-" + getPlainTextWeight(arr[i].weight) + arr[i].quality + ","
    v_str += ",1," //attribute visible? global?
    let num_curr_fields = v_str.split(",").length - 1;
    for(let i = num_curr_fields; i < num_fields; i++) {
      v_str += ",";
    }
    template += v_str;
    document.getElementById("output").innerHTML += v_str;
  }
  document.getElementById("form").reset();

}

function exportData() {
  var blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
  var link = document.createElement("a");
  if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  } else {
      alert("Your browser does not support the download attribute.");
  }

}

function createInputField(name, placeholder) {
  const input = document.createElement('input');
  input.type = 'text';
  input.name = name;
  input.placeholder = placeholder;
  input.autocomplete = 'off';
  return input;
}

function getVariationValues() {
  const variationContainer = document.getElementById('variation_container');
  const variationForms = variationContainer.querySelectorAll('form');
  const variations = [];

  variationForms.forEach((form) => {
    const id = form.querySelector('input[name="id"]').value;
    const weight = form.querySelector('input[name="weight"]').value;
    const salePrice = form.querySelector('input[name="sale_price"]').value;
    const regularPrice = form.querySelector('input[name="regular_price"]').value;
    const quality = form.querySelector('input[name="quality"]').value;

    variations.push({
      id, 
      weight,
      salePrice,
      regularPrice,
      quality,
    });
  });

  return variations;
}


function addVariation() {
  const form = document.createElement('form');
  num_variations++;
  // Create input fields for weight, sale price, regular price, and quality
  const idInput = createInputField('id', "ID")
  const weightInput = createInputField('weight', 'Weight');
  const salePriceInput = createInputField('sale_price', 'Sale Price');
  const regularPriceInput = createInputField('regular_price', 'Regular Price');
  const qualityInput = createInputField('quality', 'Quality (H or L)');

  // Create a delete button
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button'; // Prevent form submission
  deleteButton.textContent = 'X';
  deleteButton.style.marginLeft = '10px'; // Add some spacing
  deleteButton.style.cursor = 'pointer'; // Change cursor to pointer
  deleteButton.addEventListener('click', () => {
    // Remove the form when the delete button is clicked
    num_variations--;
    form.remove();
  });

  // Append the input fields and delete button to the form
  form.appendChild(idInput);
  form.appendChild(weightInput);
  form.appendChild(salePriceInput);
  form.appendChild(regularPriceInput);
  form.appendChild(qualityInput);
  form.appendChild(deleteButton);

  // Append the form to the variation container
  const variationContainer = document.getElementById('variation_container');
  variationContainer.appendChild(form);
}

document.getElementById("submit").addEventListener("click", submit);
document.getElementById("export").addEventListener("click", exportData);
document.getElementById("addVariation").addEventListener("click", addVariation);