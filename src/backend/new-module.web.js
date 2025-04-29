$w.onReady(function () {
    const nextBtn = $w("#nextBtn");

    const inputs = [
        "input[name='physique']",
        "input[name='energie']",
        "input[name='douleurs']",
        "input[name='sommeil']"
    ];

    function validateForm() {
        let allAnswered = inputs.every(selector => {
            return $w(selector).some(el => el.checked);
        });

        if (allAnswered) {
            $w("#nextBtn").enable();
        } else {
            $w("#nextBtn").disable();
        }
    }

    inputs.forEach(selector => {
        $w(selector).forEach(el => {
            el.onChange(() => validateForm());
        });
    });

    $w("#nextBtn").onClick(() => {
        // Afficher résultats simples (exemple pour 1 seule page)
        let results = inputs.map(selector => {
            const checked = $w(selector).find(el => el.checked);
            return checked ? checked.value : "Non renseigné";
        }).join("<br>");

        $w("#category1").hide();
        $w("#resultText").html = results;
        $w("#result").show();
    });
});

import { Permissions, webMethod } from "wix-web-module";

export const multiply = webMethod(
  Permissions.Anyone, 
  (factor1, factor2) => { 
    return factor1 * factor2 
  }
);
