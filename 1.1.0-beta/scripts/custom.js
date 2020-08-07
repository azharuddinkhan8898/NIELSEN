$(function () {
  var isAuto = window.localStorage.getItem("autoChange");
  if (isAuto == "true") {
    $("#auto").attr("checked", "checked");
  }
  document.getElementById("convert").addEventListener("click", function () {
    try {
      var textInput = $("#input").val().trim();
      var arrayInput = textInput.split("\n\n");
      var arrayInput2 = [];
      arrayInput.forEach(function (el) {
        var temp = [];
        var arr = el.split("\n");
        arr.forEach(function (ell) {
          temp.push(ell.trim());
        });
        var temp1 = temp[0].split("(");
        if (temp1.length > 2) {
          temp1.shift();
          var z = temp1.join("(");
          var y = z.split(")");
          y.pop();
          temp1 = y.join(")");
        } else {
          temp1 = temp1[1].split(")")[0];
        }
        //[1].split(")")[0];
        var temp2 = temp[2]
          .replace('<img src="', "")
          .replace('" style="display:none"/>', "");
        arrayInput2.push(temp1 + "\t" + temp2);
      });
      var finalText = arrayInput2.join("\n");
      $("#output").val(finalText);
    } catch {
      //$("#output").val("")
      if (!$("#auto").is(":checked")) {
        alert("Please provide input in right format");
      }
    }
  });
  // Also see: https://www.quirksmode.org/dom/inputfile.html

  var inputs = document.querySelectorAll(".file-input");

  for (var i = 0, len = inputs.length; i < len; i++) {
    customInput(inputs[i]);
  }

  function customInput(el) {
    const fileInput = el.querySelector('[type="file"]');
    const label = el.querySelector("[data-js-label]");

    fileInput.onchange = function (e) {
      if (!fileInput.value) return;

      var value = fileInput.value.replace(/^.*[\\\/]/, "");
      //console.log(fileInput);
      el.className += " -chosen";
      label.innerText = value;
      readText(e.target);
    };
  }
  var dropZone = $("body");
  $(document).bind("dragover", function (e) {
    (dropZone = $("body")), (timeout = window.dropZoneTimeout);
    if (!timeout) {
      dropZone.addClass("in");
    } else {
      clearTimeout(timeout);
    }
    var found = false,
      node = e.target;
    do {
      if (node === dropZone[0]) {
        found = true;
        break;
      }
      node = node.parentNode;
    } while (node != null);
    if (found) {
      dropZone.addClass("hover");
    } else {
      dropZone.removeClass("hover");
    }
    window.dropZoneTimeout = setTimeout(function () {
      window.dropZoneTimeout = null;
      dropZone.removeClass("in hover");
    }, 100);
  });

  function readText(filePath) {
    $("#output").val("");
    $("#output");
    var oFReader = new FileReader();
    oFReader.readAsText(filePath.files[0]);
    oFReader.onload = function (oFREvent) {
      var data = oFREvent.target.result;
      var splittedData = data.split(
        "==================================================="
      );
      $("#input").val(splittedData[2].replace("SECURE 1x1 PIXELS", "").trim());
      if ($("#auto").is(":checked")) {
        $("#convert").trigger("click");
      }
    };
  }

  $("#reset").click(function () {
    $(".file-input input").val("");
    $("#input").val("");
    $("#output").val("");
    $(".file-input").removeClass("-chosen");
    $(".file-input .label").text(
      "Please choose or drag & drop Nielsen Tags txt file"
    );
  });
  $("#auto").on("change", function () {
    window.localStorage.setItem("autoChange", $("#auto").is(":checked"));
  });
  $("#input").on("input", function () {
    if ($("#input").val() == "") {
      $("#output").val("");
    }
    var data = $("#input").val();
    if (
      data.indexOf("===================================================") !== -1
    ) {
      var splittedData = data.split(
        "==================================================="
      );
      $("#input").val(splittedData[2].replace("SECURE 1x1 PIXELS", "").trim());
    }
    if ($("#auto").is(":checked")) {
      $("#convert").trigger("click");
    }
  });
  $(".copy").click(function () {
    var copyText = document.getElementById("output");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  });
});
