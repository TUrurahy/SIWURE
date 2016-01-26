/**
 * Created by ThinkMac on 11/3/15.
 */


isKosong = function (sNamaVariable, sIsiVariable) {
    if (sIsiVariable == "" || sIsiVariable == null) {
        FlashMessages.sendWarning("Maaf, Data " + sNamaVariable + " Tidak boleh Kosong");
        return true;
    } else {
        return false;
    }
};

isBilangan = function (sNamaVariable, sIsiVariable) {
    if (isNaN(sIsiVariable)) {
        FlashMessages.sendWarning("Maaf, Data " + sNamaVariable + " harus Bilangan");
        return true;
    } else {
        return false;
    }
};

isPanjangString = function (sNamaVariable, sJmlVariable, sIsiVariable) {

    if (sIsiVariable.length > sJmlVariable) {
        FlashMessages.sendWarning("Maaf, Jumlah variable Data " + sNamaVariable + " harus " + sJmlVariable + " Karakter");
        return true;
    } else if (sIsiVariable.length < sJmlVariable) {
        FlashMessages.sendWarning("Maaf, Jumlah variable Data " + sNamaVariable + " harus " + sJmlVariable + " Karakter");
        return true;
    } else {
        return false;
    }
};

isPanjangStringDiatas = function (sNamaVariable, sJmlVariable, sIsiVariable) {
    if (sIsiVariable.length > sJmlVariable) {
        FlashMessages.sendWarning("Maaf, MAKSIMUM Jumlah variable Data " + sNamaVariable + " " + sJmlVariable + " Karakter");
        return true;
    } else {
        return false;
    }
};

isPanjangStringDibawah = function (sNamaVariable, sJmlVariable, sIsiVariable) {
    if (sIsiVariable.length < sJmlVariable) {
        FlashMessages.sendWarning("Maaf, MININUM Jumlah variable Data " + sNamaVariable + " " + sJmlVariable + " Karakter");
        return true;
    } else {
        return false;
    }
};

SelectedTerpilih = function (elementId) {
    var elt = document.getElementById(elementId);

    if (elt.selectedIndex == -1)
        return null;

    return elt.options[elt.selectedIndex].text;
};
