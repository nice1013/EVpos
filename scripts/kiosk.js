/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function item() {
    this.id = 0;
}

function kiosk(){
    this.items = [];
    this.total      = 0.00;
}

bgColors.prototype.getColor = function() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];

    
}