
'user strict';
var sql = require('../config/db.js');
console.log('profile module is running');
//User object constructor
var Profile = function(profile){
    this.profile = profile;
};

Profile.findProfile=function findProfile(id, result){
  //  console.log('asasas'+id);
        return new Promise( ( resolve, reject ) => {
        sql.query("Select * from profile where user_id = ? ", id, function (err, res) {             
          if(err) {
              console.log("error Profile model: ", err);
              return reject( err );
          }
          else{
              
             return resolve(res);
          }
      }); 
        });  
        
      },



      Profile.usersofEmployee=function usersofEmployee(id, result){
          console.log('asasas'+id);
              return new Promise( ( resolve, reject ) => {
                /*select a.name,b.role_name,c.phone
from user as a
left join role as b on a.role_id = b.id
left join profile as c on a.id = c.user_id where a.parent_user=53
*/

              sql.query("select a.name,b.role_name,a.status,c.phone from user as a left join role as b on a.role_id = b.id left join profile as c on a.id = c.user_id where a.parent_user = ? ", id, function (err, res) {             
                if(err) {
                    console.log("error Profile model: ", err);
                    return reject( err );
                }
                else{
                    
                   return resolve(res);
                }
            }); 
              });  
              
            },



      Profile.save= function save(newProfile, result){
        return new Promise( ( resolve, reject ) => {
       sql.query('INSERT INTO profile set phone='+newProfile.phone+', user_id='+newProfile.user_id+'', function (err, res) {
            if(err) {
            return reject( err );
            }
            else{
            return resolve(res.insertId);
            
            }
            });  
        }); 
    },


    Profile.saveimage= function saveimage(user_update, result){
      return new Promise( ( resolve, reject ) => {
        sql.query("UPDATE  user set profile_image='"+user_update.file+"' where  id = ? ", user_update.user_id, function (err, res) {   
          if(err) {
          return reject( err );
          }
          else{
          return resolve(res.affectedRows);
          
          }
          });  
      }); 
  },

    Profile.Update= function update(newProfile, result){
      console.log(newProfile);
      
        return new Promise( ( resolve, reject ) => {
            sql.query("UPDATE  profile set phone='"+newProfile.phone+"',company='"+newProfile.company+"',website='"+newProfile.website+"' where user_id = ? ", newProfile.user_id, function (err, res) {   
    
            if(err) {
           
            return reject( err );
            }
            else{
          
            return resolve(res.insertId);
            
            }
            });  
        }); 
    }



      module.exports = Profile;