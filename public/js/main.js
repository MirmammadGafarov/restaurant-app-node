//
$("#searchInput")
  .keyup(function () {
    var enteredValue = $(this).val().toLowerCase();
    var foodCollection = $("#foodList").children("li");
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

$("#foodList li").click(function () {
  var selectedFood = $(this).text();
  var selectedFoodPrice = $(this).children().val();

  $("#searchInput").val(selectedFood);
  $("#priceInput").val(selectedFoodPrice);

  $("#foodList").hide();
});

$("#addButton").click(function () {
  var rowNum = $("#wishList tr").length;
  var deskName = $("#desk").val();
  var foodName = $("#searchInput").val();
  var quantity = $("#quantity").val();

  var calculatedPrice = Math.abs(
    Number(quantity) * Number($("#priceInput").val())
  ).toFixed(1);
  var orderTime = new Date().getHours() + ":" + new Date().getMinutes();
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

    $("#createButton").prop("disabled", false);
    $("#desk").prop("disabled", true);
    $("#searchInput").val("");
    $("#quantity").val("");
  }
});

$(document).ready(function () {
  $(".status").click(function () {
    if ($(this).val() == "Hazırlanır") {
      $(this).val("Verildi");
      $(this).parent().siblings().find(".pullBack");
    } else if ($(this).val() == "Verildi") {
      $(this).val("Hazırlanır");
    }
  });

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
