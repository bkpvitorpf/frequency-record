const Log = require('../models/Log');

module.exports = {
  async clear(req,res){
    const {stringHour,stringMinute} = req.params;

    const hour = Number(stringHour);
    const minute = Number(stringMinute);

    switch (hour) {
      case 7:
        if(minute >= 20 && minute <= 25){
          await Log.truncate();
          return res.status(200).json({message:"Tabela de logs limpa com sucesso"});
        }
      break;
      
      case 8:
        if(minute >= 05 && minute <= 10){
          await Log.truncate();
          return res.status(200).json({message:"Tabela de logs limpa com sucesso"});
        }else if(minute >= 50 && minute <= 55){
          await Log.truncate();
          return res.status(200).json({message:"Tabela de logs limpa com sucesso"});
        }
      break;

      case 9:
        if(minute >= 35 && minute <= 40){
          await Log.truncate();
          return res.status(200).json({message:"Tabela de logs limpa com sucesso"});
        }else if(minute >= 50 && minute <= 55){
          await Log.truncate();
          return res.status(200).json({message:"Tabela de logs limpa com sucesso"});
        }
      break;
        
      case 10:
        if(minute >= 35 && minute <= 40){
          await Log.truncate();
          return res.status(200).json({message:"Tabela de logs limpa com sucesso"});
        }
      break;
        
      case 11:
        if(minute >= 10 && minute <= 15){
          await Log.truncate();
          return res.status(200).json({message:"Tabela de logs limpa com sucesso"});
        }
      break;

      case 12:
        if(minute >= 05 && minute <= 10){
          await Log.truncate();
          return res.status(200).json({message:"Tabela de logs limpa com sucesso"});
        }
      break;
    }
  }
}