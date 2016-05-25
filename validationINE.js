function ucChpCODE_INE_Valeur_IsCodeINEAllowed(valeur){
    
    
    isValid = false;
    
    alphanum = /^[A-Za-z0-9]*$/.test(valeur);
    
    if (alphanum) {
       
    
    
        /**
         *  Test du code INE
         *
         * 2 possibilités: Code BEA ou Code attribué
         *
         * Un calcul de clé de vérification par possibilité
         */
        
        
        /** Test Cas 1: numéro BEA
          * 
          * Le calcul de cette clé se fait en calculant le reste du nombre
          * à 10 chiffres dans sa division par 23, ce reste étant ensuite traduit
          * en lettre sur une base de 23 lettres, correspondant aux 26 lettres
          * de l’alphabet auxquelles on enlève le i, le o et le q (ce qui
          * laisse donc 23 lettres).
          * 
          */
         strCle="ABCDEFGHJKLMNPRSTUVWXYZ";
         tmpNumINE = valeur.substr(0,10);
         tmpCleINE = valeur.substr(10,1);
     
         if (strCle.substr(tmpNumINE%23,1)==tmpCleINE) {
            isValid = true;
         } else {
            
            /** Test Cas 2: numéro attribué par un établissement
             *
             * La clé de contrôle se définit comme le chiffre des unités du matricule
             * retranscrit en base 10. Ainsi, seul le calcul des unités est nécessaire.
             * En effet, toutes les puissances de 36 sauf 0, ont 6 pour chiffre des unités
             */
            sum = 0
            for (i=0;i<10;i++){
                key = tmpNumINE.substr(i,1);
                key10 = b36tob10(key);
                
                if (i<9){
                  sum+=(key10*6);
                } else {
                  sum+=key10*1;
                }
    
            }
            
            x=sum.toString();
             if (x.substr(x.length-1,1)==tmpCleINE){
                isValid=true;
            }

        }
    }
    
    return isValid;
}

function b36tob10(b36) {
    // Convert Base36 to Base10
    
    if ( /^[0-9]*$/.test(b36)){
      b10=b36;
    } else {
       b10 = b36.charCodeAt(0)-87;
    }

   return b10;     
}
