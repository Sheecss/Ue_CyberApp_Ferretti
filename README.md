# UE_CyberApp_Ferretti

## Introduction

Ce document est un rendu/mode d'emploir pour le projet d'application web de l'UE CyberApp de l'IMT Atlantique. On commence par présenter la version coeur de notre application qui repose sur Angular 8 et Spring Boot puis on ajoute progressivement trois étapes de sécurisation avec tout d'abord la gestion des attaque xss côté springboot puis un ajout d'une mthode d'authentification avec okta et enfin la gestion des certificat pour établir une connexion sécurisée.

## L'application

Cette application a été développé en s'appuyant sur différent tutorials et cours sur Angular 8 et spring-Boot, l'objectif est de crée un système simple de gestion de rendez-vous pour une secrétaire. On limite notre application à un système de savegarde/édition/suppression des rendez-vous.

Les déscriptions ci-dessous repose sur la Version_1 de ce git.

### Le back-end avec Spring-Boot

On commence par générer un spring-boot de base dans la version voulue ce qui nous donne un squelette d'application web sur lequelle on rajoute nos couche voulue.

Le Spring initializr permet de crér cette base :

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/spring%20initializr.PNG "Logo Title Text 1")

Les dépendences principales sont : 
 
![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/Capture.PNG "Logo Title Text 1")

Une fois cette première étape effectuée, on rajoute notre couche personelle avec la classe Rdv que nous utiliserons. On peut aussi étendre ce système avec la création de classe Patient et Docteur mais pour montrer nos ajouts, cette base suffit :


![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/classe_rdv.PNG "Logo Title Text 1")

Une fois nos items créés, on va ajoutés la possibilité de gérer une base de données avec un controller et un repository qui nous permettra de stocker nos rdv.

![alt text](https://github.com/Sheecss/Ue_CyberApp_Ferretti/blob/main/img/rdvcontroller.PNG "Logo Title Text 1")
