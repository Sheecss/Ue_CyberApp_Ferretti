# UE_CyberApp_Ferretti

## Introduction

Ce document est un rendu/mode d'emploir pour le projet d'application web de l'UE CyberApp de l'IMT Atlantique. On commence par présenter la version coeur de notre application qui repose sur Angular 8 et Spring Boot puis on ajoute progressivement trois étapes de sécurisation avec tout d'abord la gestion des attaque xss côté springboot puis un ajout d'une mthode d'authentification avec okta et enfin la gestion des certificat pour établir une connexion sécurisée.

## L'application

Cette application a été développé en s'appuyant sur différent tutorials et cours sur Angular 8 et spring-Boot, l'objectif est de crée un système simple de gestion de rendez-vous pour une secrétaire. On limite notre application à un système de savegarde/édition/suppression des rendez-vous.

Les déscriptions ci-dessous repose sur la Version_1 de ce git.

### Le back-end avec Spring-Boot

#### Pour lancer l'application, on fait un run maven build sur eclipse et on choisi spring-boot:run

On commence par générer un spring-boot de base dans la version voulue ce qui nous donne un squelette d'application web sur lequelle on rajoute nos couche voulue.

Le Spring initializr permet de créer cette base :

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/spring%20initializr.PNG "Logo Title Text 1")

Les dépendences principales sont : 
 
![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/Capture.PNG "Logo Title Text 1")

Une fois cette première étape effectuée, on rajoute notre couche personelle avec la classe Rdv que nous utiliserons. On peut aussi étendre ce système avec la création de classe Patient et Docteur mais pour montrer nos ajouts, cette base suffit :


![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/classe_rdv.PNG "Logo Title Text 1")

Une fois nos items créés, on va ajoutés la possibilité de gérer une base de données avec un controller et un repository qui nous permettra de stocker nos rdv. Ce controller nous permet de mapper sur une url http://localhost:8080/rdv-liste qui contiendra une liste des rdvs que l'on récupérera sur notre interface angular.

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/rdvcontroller.PNG "Logo Title Text 1")

On aura sur l'url http://localhost:8080/rdvs, l'ensemble de nos rdvs en format json :

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/rdv_json.PNG "Logo Title Text 1")

### Le front-end avec Angular 8

#### Pour lancer l'application, on fait un run ng serve dans le répertoire Version_X/client

#### Pour notre partie Angular, en plus des composants habituel, on installe le package suivant : npm install --save ngx-mat-datetime-picker@2.0

On commence par créer le service rdv qui va gérer l'ajout et la récupération des rdvs, pour cela on utilise les mapping fait sous java ce qui donne :

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/rdv_service.PNG "Logo Title Text 1")

On met ensuite en place la partie affichage et selection de la liste des rdvs en utilisant des bouton cliquable qui renvoie ensuite vers al page d'édition de l'item voulue. On ajoute aussi un bouton Add :

# Mettre Image

Enfin, on crée le formulaire qui nous permet de modifier et ajouter des rdvs, on utilise ngModel pour remplir les cases avec les vgaleurs actuelles en cas de modification. On peut aussi Supprimer et retourner en arriere :

# Mettre Image

## Sécurisation de l'application avec Spring-Boot Security, Okta et Angular :

Notre application est pour le moment totalement accessible a tous et donc vulnérable à quiconque possède l'url ou à accès au terminal dans le cas d'une app en local.
Notre premier objectif est donc de crée un portail d'authzentification se basant sur okta afin de filtrer les utilisateurs.

## Mise en place sur Spring-Boot :

On commence par configurer la partie sécurité sur le serveur. Pour cela, on va crée une classe SecurityConfiguration qui étend la classe spring-boot WebSecurityConfigurerAdapter. C'est à partir de que l'on va demander à ce que chaque requête http fournisse un jeton jwt qui sera ensuite comparé au données fournies à l'application et présente sur le serveur okta. Cela donne :

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/sp_sec.PNG "Logo Title Text 1")

Une fois cela fait, la partie serveur est alors bloqué par un portail sécurisé :

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/sp_sec_serv.PNG "Logo Title Text 1")

## Ajout d'un portail sur Angular 8 :

Une fois le serveur vérouillé, on doit ajouter à notre partie Angular une capacité d'authentification. Pour cela, on commence par crée un composant "home" sur lequel on redirigera toutes les arrivées et qui prendra en charge l'authentification. On doit pour cela modifier le routing de notre application avec un nouveau fichier auth-routin.module.ts et dans le même temps on configure ce composant home pour gérer okta :

On ajoute dans le routing les redirections vers /home lors del'arrivée sur le site ainsi que les crédentials fourni par okta pour mettre en place le mécanisme d'authentification. Ce sont les même que ceux inscrit dans application.properties côté serveur :

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/auth_rout.PNG "Logo Title Text 1")

Dans notre composant home, on ajoute la gestion du statut d'authentification avec l'apparition ou non des boutons login/logout :

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/home.PNG "Logo Title Text 1")

Enfin, on ajoute un intercepoteur qui gère les communication entre okta et l'application et qui permet ensuite d'accéder aux données du serveur.

Un fois cela fait, la communication n'est toujours pas possible entre la partie client et serveur malgré la bonne authentification, cela est du au politique CORS du serveur. On va donc ajouter des exceptions pour notre url d'origine :

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/excep_cors.PNG "Logo Title Text 1")

On a alors une application qui a mise en place un système d'authentification sécurisé restreint actuellement à une seul identifiant qui sera pour ce test :

jean-marie.ferretti@imt-atlantique.net

testcyber

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/auth_okta.PNG "Logo Title Text 1")

## Sécurisation avec https :

Afin d'aller plus loin, on souhaite utiliser le protocole https sur notre site. Pour le faire côté Angular, il suffit de lancer le client avec la commande : ng serve --ssl true. 
On a alors un site qui fonctionne en https avec uncertificat généré, celui ci n'est cependant pas connus de Google et on obtient donc :

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/https_1.PNG "Logo Title Text 1")

On va donc maintenant générer des certificats en utilisant le git de Ruben Vermeulen :

git clone https://github.com/RubenVermeulen/generate-trusted-ssl-certificate.git
cd generate-trusted-ssl-certificate
bash generate.sh

On fourni ainsi sur ce git un serveur et une clé :

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/https_2.PNG "Logo Title Text 1")

Il faut alors installer le certificat sur la machine de test :
Pour cela, on va dans le dossier ssl de la version utilisé (ici 4) puis on choisi d'installer le certificat en tant qu'agence de certifications racine tierce.

Enfin, on peut lancer l'application côté serveur avec : 
ng s -o ---ssl true --ssl-key ssl/server.key  --ssl-cert ssl/server.crt

On obtient finalement :

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/certif_https.PNG "Logo Title Text 1")

Notre angular fonctionne alors en https.
On veut aussi ajouter le protocole https sur notre backend springboot. Cependant, malgré mes essais multiples, je n'ai pas réussi à faire accepté le certificat par chrome ce qui amène à bloquer la communication entre back et front.

Je propose donc ci-dessous l'implémentation du ssl sur spring-boot mais ce sera pour informùation :
On commence par générer un certificat que l'on signer soi-même avec java keytool :

 -genkey -alias server -keyalg RSA -keysize 2048 -keystore D:\....\ressources\myserver.jks -dname "CN=myserver,OU=IT-WebDev, O=TIACHOP, L=HCM, ST=0753, C=VN" && keytool -certreq -alias server -file D:\....\ressources\myserver.csr -keystore D:\....\ressources\myserver.jks
 
Les différents fichiers sont ajouté dans le dossier ressource de notre version.
On force ensuite spring-boot à utilisé le https et on ajouté les propriétés dans application.properties :

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/https-4.PNG "Logo Title Text 1")

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/https_5.PNG "Logo Title Text 1")

Cela nous permet ainsi de rediriger les requêtes vers le port 8443 d'où :

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/https_7.PNG "Logo Title Text 1")
