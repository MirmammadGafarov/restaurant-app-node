/* 
$("#searchInput")
İzahı: 
- .keyup: Hər keyup event tətikləndikdə input-a(#searchInput) yazdığımız dəyər ilə DB-dəki dəyər müqayisə edilərək dinamik nəticə verəcək.
- #searchInput: Axtarmaq istədiyimiz elementin(yeməyin vəya içkinin) adını yazıdığımız Input
- enteredValue: Inputa daxil edilən dəyər
- foodCollection: DB-dəki elementlərin siyahısı (HTML collection olduğu üçün loop əməliyyatını tətbiq etmək olmur)
- foodArray: Spread operator ilə HTML collection-ı Array-ə convert edəcək
- --------
- .focus: 
- Input-a fokuslandıqda elementlərin siyahısını göstərcək
*/

$("#searchInput")
  .keyup(function () {
    const enteredValue = $(this).val().toLowerCase();
    const foodCollection = $("#foodList").children("li");
    const foodArray = [...foodCollection];
    foodArray.forEach((food) => {
      txtValue = food.textContent || food.innerText;
      if (txtValue.toLowerCase().indexOf(enteredValue) >= 0) {
        food.style.display = "";
      } else {
        food.style.display = "none";
      }
    });
  })
  .focus(function () {
    $("#foodList").show();
  });

/* 
$("#foodList li")
İzahı: 
- .click: seçilmiş elementin adı və qiymətini Inputa daxil eedilməsi üçün
- selectedFood: seçilmiş elementin adı
- selectedFoodPrice: seçilmiş elementin qiyməti (type: hidden)
- #searchInput: seçdiyimiz elementin adı bura daxil ediləcək
- #searchInput: seçdiyimiz elementin qiyməti bura daxil ediləcək (type: hidden)
- #foodList: Seçim etdikdən sonra gizlədiləcək
*/

$("#foodList li").click(function () {
  const selectedFood = $(this).text();
  const selectedFoodPrice = $(this).children().val();

  $("#searchInput").val(selectedFood);
  $("#priceInput").val(selectedFoodPrice);
  $("#foodList").hide();
});

/* 
$("#addButton")
İzahı: 
- .click: button-a click etdikdə elementlər cədvələ daxil ediləcək 
- rowNum: Cədvəlin sıra nömrəsi
- deskName: Masanın adı
- foodName: Yemək adı
- quantity: Yemək miqdarı
- calculatedPrice: Cəm qiyməti
- Math.abs(): Mənfi dəyər daxilsə belə hər zaman müsbət dəyər return eləsin
- orderTime: Sifariş saatı
- status: default dəyəri 'Hazırlanır' (type: hidden)
- pullBack: default dəyəri 'Geri al <--' (type: hidden)
- #wishList: cədvəl ID-sidir

*/

$("#addButton").click(function () {
  const rowNum = $("#wishList tr").length;
  const deskName = $("#desk").val();
  const foodName = $("#searchInput").val();
  const quantity = $("#quantity").val();

  const calculatedPrice = Math.abs(
    Number(quantity) * Number($("#priceInput").val())
  ).toFixed(1);

  const orderTime = new Date().getHours() + ":" + new Date().getMinutes();

  if (deskName === "" || foodName === "" || quantity === "") {
    alert("Xanaları tam doldurun");
  } else {
    $("#wishList").append(`
  
    <tr class=" g-0 row" >
      <td class="col-1"><input type="text" name='rowNum'  class="form-control" value='${rowNum}' readonly ></td>
      <td class="col-2"><input type="text" name='deskName' class="form-control" value='${deskName}' readonly></td>
      <td class="col-5"><input type="text" name='foodName' class="form-control" value='${foodName}' readonly></td>
      <td class="col-2"><input type="text" name='quantity' class="form-control" value='${Math.abs(
        quantity
      )}' readonly></td>
      <td class="col-1"><input type="number" name='calculatedPrice' class="form-control" value='${calculatedPrice}' readonly></td>
      <td class="col-1"><input type="text" name='orderTime' class="form-control" value='${orderTime}' readonly></td>
      <td ><input type="hidden" name='status' class="form-control" value="Hazırlanır"  ></td>
      <td ><input type="hidden" name='pullBack' class="form-control" value="Geri al <--" ></td>
    </tr>
    
    `);

    /*
Cədvələ sifariş əlavə olunduqda:
- createButton: Sifariş Yarat buttonu seçimi aktivləşmiş olacaq 
- #desk: masa seçimi deaktiv olacaq
- #searchInput: Input xanası yenidən axtarış etmək üçün sıfırlanacaq
- #quantity: Input xanası yenidən miqdar yazmaq üçün sıfırlanacaq
 */

    $("#createButton").prop("disabled", false);
    $("#desk").prop("disabled", true);
    $("#searchInput").val("");
    $("#quantity").val("");
  }
});

// Sifariş daxilində status klaslı Input elementinin dəyərini dəyişmək

$(document).ready(function () {
  $(".status").click(function () {
    if ($(this).val() == "Hazırlanır") {
      $(this).val("Verildi");
      $(this).parent().siblings().find(".pullBack");
    } else if ($(this).val() == "Verildi") {
      $(this).val("Hazırlanır");
    }
  });
  // Sifariş daxilində pullBack klaslı Input elementinin dəyərini dəyişmək

  $(".pullBack").click(function () {
    if ($(this).val() == "Geri al <--") {
      $(this).val("Geri alındı");
      $(this).parent().siblings().find("input");
      $(this).parent().siblings().find(".status").val("İmtina");
    } else {
      $(this).val("Geri al <--");
      $(this).parent().siblings().find(".status").val("Hazırlanır");
    }
  });
});
