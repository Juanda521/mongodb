// Usando la colección listingsAndReviews de sample_airbnb, encuentre mediante el uso de agregaciones, cuál es la propiedad con mayor número de servicios ("amenities") de la colección.

// Usando la colección listingsAndReviews de sample_airbnb, encuentre mediante el uso de agregaciones, el número de propiedades que tienen conexión a Internet, sea desde Wifi o desde cable (Ethernet). Nota. Revise el campo amenities (“servicios”)

// Usando la colección listingsAndReviews de sample_airbnb, encuentre mediante el uso de agregaciones, todas las propiedades que hayan recibido 50 o más comentarios, que la valoración ("review_score_rating") sea mayor o igual a 80, que cuenten con conexión a Internet vía cable y que estén ubicadas en Brazil.

// Usando la colección listingsAndReviews de sample_airbnb, muestre el costo promedio de una habitación en cada país para las propiedades de tipo casa.

// Utilizando la base datos de sample_restaurants, construir un tablero que nos permita mostrar:
// ¿Cuántos restaurantes hay en total?

// ¿Cuál es el distrito que cuenta con el mayor número de restaurantes?

// ¿Cuántos restaurantes hay por cada tipo de cocina?

// ¿Cuántos restaurantes hay por cada código postal?

// Nota: El tablero debe contar como mínimo, con un digrama de pastel, uno de barras, un número, un mapa y dos filtros.



use ('sample_airbnb');

/*1

db.listingsAndReviews.aggregate([
    {
   $project: {
     numeroServicios: {$size:"$amenities"}
   }
},{
    $sort: {
      "numeroServicios": -1
    }
},{
    $limit: 1
}])

*/

/*2
db.listingsAndReviews.aggregate([
    {
        $match: {
          "amenities": {$in:["Internet","Wifi"]}
        }
    },{
    $project: {
      "amenities":true
    }
},
])

*/
/*3
db.listingsAndReviews.aggregate([
    { 
    $match: {
        $and:[
            {"number_of_reviews":{$gte:50}},
            {"review_scores.review_scores_rating":{$gte:80}},
            {"amenities": {$in:["Wifi","Internet"]}},
            {"address.country":"Brazil"}
        ]
    }
    },{
        $project: {
            "address.country":true
          }
    }])

*/

/*4

db.listingsAndReviews.aggregate([
    {
        $match:{
            "property_type":"House"
        }
    },{
        $group: {
            _id: "$address.country",
            precioPais:
            {
                $avg: "$price"
            }
        }
    }])
    
*/

/* dashboar 
<iframe style="background: #21313C;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);width: 100vw;height: 100vh;"  src="https://charts.mongodb.com/charts-project-0-saanr/embed/dashboards?id=64557960-d3ec-41ae-8f0e-6b93edc04f5a&theme=dark&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
*/