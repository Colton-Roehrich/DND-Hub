import React from "react";

class dTwenty extends React.Component {
    render() {
        
        var maxi = 20;
        var mini = 1;
        var value= rollD20(mini,maxi);


        function rollD20(min, max){
            min = Math.ceil(mini);
            max = Math.floor(maxi);
            return Math.floor(Math.random() * (max - min) + min);
          }
        return value.toString();
    }
    
  }
  export default dTwenty;   