document.addEventListener("DOMContentLoaded", () => {
  const mainCont = document.getElementById("mainCont");
  const buttonCont = document.getElementById("picker_btn_cont");
  const resultList = document.getElementById("result");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

if (tab.url === undefined || tab.url.indexOf("chrome") == 0) {
document.querySelector('.no-color').style.display = 'none'
      buttonCont.innerHTML =
'<div class="cant-container"><img class="cant-icon" src="./assets/icons/no-way.svg"><img><span style="font-family: lobster, sans-serif">Color picker doesn’t work on privileged pages</span></div>';
resultList.style.display = 'none'
    } else if (tab.url.indexOf("file") === 0) {
      buttonCont.innerHTML =
        '<span style="font-family: lobster, sans-serif">Eye Dropper</span> can\'t access <i>local pages</i>';
    } else {
      const button = document.createElement("button");
      button.setAttribute("id", "picker_btn");
      button.innerText = "Pick Color from webpage";

      button.addEventListener("click", () => {
        if (!window.EyeDropper) {
          GiveMetheChild(
            "#ad5049",
            "Your browser does not support the EyeDropper API"
          );
          return;
        }

        chrome.tabs.sendMessage(tabs[0].id, {
          from: "popup",
          query: "eye_dropper_clicked",
        });
        window.close();
      });

      buttonCont.appendChild(button);
    }
  });

  chrome.storage.local.get("color_hex_code", (resp) => {
    if (resp.color_hex_code && resp.color_hex_code.length > 0) {
      resp.color_hex_code.forEach((hexCode) => {
        const liElem = document.createElement("li");
        liElem.innerText = hexCode;
        liElem.style.backgroundColor = hexCode;

        liElem.addEventListener("click", () => {
          navigator.clipboard.writeText(hexCode);
          document.querySelector('.info-container').style.display = 'block'
          setTimeout(()=>{
          document.querySelector('.info-container').style.display = 'none'
          },2000)
          GiveMetheChild("#e19526", "Hex code is copied to clipboard!");
        });
        resultList.appendChild(liElem);
      });

      const ClearButton = document.createElement("button");
      ClearButton.innerHTML = "<img src='./assets/icons/clear.svg' alt='clear-button'>";
      ClearButton.setAttribute("id", "ClearButton");

      ClearButton.addEventListener("click", () => {
        chrome.storage.local.remove("color_hex_code");
        window.close();
      });
      
      document.querySelector('.no-color').style.display = 'none'
      resultList.style.display = 'grid'
      document.querySelector('header').appendChild(ClearButton);
    }
  });
});
