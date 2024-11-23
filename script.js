document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementsByClassName("modal")
    const startContent = document.getElementsByClassName("start-content")
    const closeModal = document.getElementsByClassName("close-modal")
    const nameField = document.getElementById("playerName")
    const gameView = document.getElementsByClassName("game-view")
    const errorMessage = document.getElementById('error-message');
    const startButton = document.getElementsByClassName("btn-start")
    const sceneImage = document.getElementsByClassName("game-image")
    const sceneText = document.getElementsByClassName("game-text")
    const optionsContainer = document.getElementById("game-buttons")
    const goodbyeTextField = document.getElementById("goodbye-text")

    let playerName = ""
    let tschüssText = ""

    // Click handler to close modal    
    closeModal[0].addEventListener('click', function() {
        modal[0].style.display = "none"
        startContent[0].style.display = "block"
    })

    // Click handler to start game
    startButton[0].addEventListener('click', function() {
        if (nameField.value !== "") {
            // Store the player's name in the variable
            playerName = nameField.value;
            tschüssText = `Hallo ${playerName}, vielen Dank für die tolle Zusammenarbeit in 2024. Dir und deiner Familie nur das Beste und eine tolle Weihnachtszeit \u2764`
    
            // Hide start screen and show game view
            startContent[0].style.display = "none"
            gameView[0].style.display = "block"

            // Clear any existing error message
            errorMessage.innerText = "";

            startGame()
        } else {
            // Show error message if the input is empty
            errorMessage.innerText = "Name darf nicht leer sein";
        }
    })

    // Definition des Szenen-Arrays
    let scenes = []

    // Inventar definieren
    let inventory = {}

    // erste Funktion zum Starten des Spiels
    const startGame = () => {
        console.log("Spiel startet")
        
        inventory = {
            lebkuchen: false,
            glühwein: false
        }

        fillSceneData()
        showSceneContent(2)
    }

    // diese Funktion gibt den Inhalt der Szene aus
    const showSceneContent = (sceneID) => {
        let sceneContent = {}

        scenes.forEach(scene => {
            if (sceneID === scene.id) {
                sceneContent = scene   
             }  
        })

        if(sceneContent.goodbyeText) {
            goodbyeTextField.innerText = tschüssText
            goodbyeTextField.classList.remove("hidden")
            goodbyeTextField.classList.add("goodbye-text")
        }

        sceneText[0].innerText = sceneContent.sceneDescription
        sceneImage[0].src = sceneContent.image

        while(optionsContainer.firstElementChild) {
            optionsContainer.removeChild(optionsContainer.firstElementChild)
        }

        if(sceneContent.goodbyeText) {
            console.log("Add the css class for one button");
            optionsContainer.classList.add("game-buttons-endScreen")
        }

        sceneContent.options.forEach(option => {
            if(option.showThisOption()) {
                console.log(option)

                const newButton = document.createElement("button")
    
                newButton.innerText = option.optionText
                newButton.classList.add("game-btn")
                newButton.addEventListener("click", () => selectOption(option))
    
                optionsContainer.appendChild(newButton)
            }
        })
    }

    // diese Funktion verarbeitet die Auswahl der nächsten Option
    const selectOption = (option) => {
        console.log(inventory)

        if(option.inventoryWithThisOption) {
            inventory = option.inventoryWithThisOption
        }

        if (option.nextScene === 0) {
            window.location.reload()
        }  
        else {
            showSceneContent(option.nextScene)
        }
    }

    /*
        TODO:
        - Button am Ende wenn nur noch eine Option ist fixen
        - Allen Endszene TschüssText auf true und nextScene = 0
            - PageReload
        - Modal Text fertig machen / Entscheiden ob wir es noch brauchen
        - Testen
        - Neue Mailadresse
        - Neuer GitHub Account
        - Code pushen & gitHub pages
    */

    const fillSceneData = () => {
        scenes = [
            {
                id: 2,
                sceneDescription: "Auf einem Schreibtisch entdeckst du eine Tasse Glühwein und einen Teller Lebkuchen.",
                image: "img/2.jpeg",
                options: [
                    {
                        optionText: "Du legst direkt mit dem Schmücken los.",
                        nextScene: 3,
                        showThisOption: () => true,
                        inventoryWithThisOption: {
                            lebkuchen: true,
                            glühwein: true
                        }
                    },
                    {
                        optionText: "Du startest mit der Pause: Zeit für Leckeres muss sein!",
                        nextScene: 3,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 3,
                sceneDescription: "Dabei fällt dir auf, dass der Baum schief steht. Das sieht nicht schön aus.",
                image: "img/3.jpeg",
                options: [
                    {
                        optionText: "Du stabilisierst den Baum mit Tesafilm und Büroklammern.",
                        nextScene: 4,
                        showThisOption: () => true,
                    },
                    {
                        optionText: "Du lässt es so. Das wirst du beim Schmücken kaschieren.",
                        nextScene: 19,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 4,
                sceneDescription: "Der Baum steht nun viel besser. Das gefällt deinem Monk. Als nächstes öffnest du die Schachtel mit dem Weihnachtsschmuck - doch diese ist leer.",
                image: "img/4.jpeg",
                options: [
                    {
                        optionText: "Du schmückst den Baum mit Büroklammern und Haftnotizen.",
                        nextScene: 5,
                        showThisOption: () => true,
                    },
                    {
                        optionText: "Du suchst nach dem echten Schmuck.",
                        nextScene: 16,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 5,
                sceneDescription: "Der Hausmeister kommt, lobt deinen Einsatz und will helfen. Im Keller hat er eine Box mit Weihnachtsdeko gefunden. Du wirfst einen Blick hinein. Darin befinden sich unfassbar kitschig goldene Ornamente.",
                image: "img/5.jpeg",
                options: [
                    {
                        optionText: "Du hängst die Kugeln an den Baum.",
                        nextScene: 6,
                        showThisOption: () => true,
                    },
                    {
                        optionText: "Weniger ist mehr. Du lenkst den Hausmeister mit Glühwein ab.",
                        nextScene: 12,
                        showThisOption: () => inventory.glühwein,
                        inventoryWithThisOption: {
                            lebkuchen: true,
                            glühwein: false
                        }
                    },
                    {
                        optionText: "Bloß nicht diese Kugeln. Du erzählst, dass in der Küche das Waschbecken tropft.",
                        nextScene: 13,
                        showThisOption: () => !inventory.glühwein,
                    },
                ]
            }, 
            {
                id: 6,
                sceneDescription: "Als du eine besonders funkelnde Kugel berührst, beginnt diese zu vibrieren. Sie schwebt vor dir und spricht zu dir: Sie wird dir einen Wunsch erfüllen.",
                image: "img/6.jpeg",
                options: [
                    {
                        optionText: "Du wünschst dir einen perfekt geschmückten Baum.",
                        nextScene: 7,
                        showThisOption: () => true,
                    },
                    {
                        optionText: "Du wünschst dir ein kleines Rentier herbei.",
                        nextScene: 8,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 7,
                sceneDescription: "So sei es: Der Baum leuchtet in allen Regenbogenfarben und schwebt sogar einige Zentimeter über dem Boden. Mission erfüllt.",
                image: "img/7.jpeg",
                goodbyeText: true,
                options: [
                    {
                        optionText: "Nochmal spielen",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 8,
                sceneDescription: "Tatsächlich. Ein Rentier erscheint. Es galoppiert durchs Büro und richtet Chaos an. Stühle und Tische werden umgerissen. Der Baum bleibt stehen - deiner Stabilisierung sei Dank!",
                image: "img/8.jpeg",
                options: [
                    {
                        optionText: "Du stellst Stühle und Tische wieder auf.",
                        nextScene: 9,
                        showThisOption: () => true,
                    },
                    {
                        optionText: "Du lockst das Rentier mit dem Lebkuchen an.",
                        nextScene: 10,
                        showThisOption: () => inventory.lebkuchen,
                        inventoryWithThisOption: {
                            lebkuchen: false,
                            glühwein: false
                        }
                    },
                    {
                        optionText: "Du versuchst, das Rentier einzufangen",
                        nextScene: 11,
                        showThisOption: () => !inventory.lebkuchen,
                    },
                ]
            }, 
            {
                id: 9,
                sceneDescription: "Während du aufräumst, verschwindet das Rentier durch die offene Tür. Immerhin sehen Büro und Baum wieder ganz passabel aus. Weihnachten kann kommen.",
                image: "img/9.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 10,
                sceneDescription: "Das Rentier nimmt den Lebkuchen und schmatzt zufrieden. Es ist glücklich und bleibt bei euch. Zwar ist das Büro chaotisch, doch das stört nicht. Alle lieben das neue Büro-Rentier.",
                image: "img/10.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 11,
                sceneDescription: "Du hast Pech. Das Rentier liebt seine Freiheit. Es entwischt. Aus Protest hebt es sein Bein und pinkelt an deinen Baum, bevor es verschwindet. Ohje, da musst du dir bis Weihnachten was einfallen lassen!",
                image: "img/11.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 12,
                sceneDescription: "Der Hausmeister liebt deinen Baum. Und den Glühwein - etwas zu sehr. Beschwipst wedelt er mit seiner Tasse und verschüttet alles über dem Baum.",
                image: "img/12.jpeg",
                options: [
                    {
                        optionText: "Du ignorierst den Geruch.",
                        nextScene: 14,
                        showThisOption: () => true,
                    },
                    {
                        optionText: "Du versprühst Raumduft über dem Baum.",
                        nextScene: 15,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 14,
                sceneDescription: "Zufällig kommt die Verwaltungsleitung vorbei und bemerkt den Geruch. Alkohol am Arbeitsplatz? Unverschämt! Die Weihnachtsfeier wird dieses Jahr gestrichen. Da hast du ja was angerichtet!",
                image: "img/14.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 15,
                sceneDescription: "Der Baum duftet jetzt zwar nach Lavendel. Doch nach und nach fallen alle Nadeln ab. Nach 10 Minuten stehst du vor einem kahlen Gerippe. Du musst es wohl mit einem neuen Baum nochmal versuchen.",
                image: "img/15.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 13,
                sceneDescription: "Der Baumschmuck ist vergessen, denn der Schaden muss sofort repariert werden. Du wirst zum Helferlein des Hausmeisters und assistierst. Zeit zum Baumschmücken bleibt dir nicht mehr. Das muss jemand anderes übernehmen.",
                image: "img/13.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 16,
                sceneDescription: "In einem zweiten Karton entdeckst du zumindest eine Lichterkette. Du seufzt, denn sie ist eher ein Knotenball.",
                image: "img/16.jpeg",
                options: [
                    {
                        optionText: "Du ziehst fest an einem Ende an der Kette.",
                        nextScene: 17,
                        showThisOption: () => true,
                    },
                    {
                        optionText: "Du versuchst, den Knoten vorsichtig zu lösen.",
                        nextScene: 18,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 17,
                sceneDescription: "Die Kette reißt ruckartig und du stolperst. Beim Fallen reißt du den Baum um. Du selbst bleibst zum Glück unversehrt, aber die Tanne ist dahin. Du solltest eine neue besorgen und es erneut probieren.",
                image: "img/17.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 18,
                sceneDescription: "Der Knoten wird schlimmer und plötzlich ist die ganze Lichterkette um dich gewickelt. So kannst du keinen Baum schmücken. Du wartest auf jemanden, der dich befreit.",
                image: "img/18.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 19,
                sceneDescription: "Während deiner Suche nach Baumschmuck landest du im IT-Lager. Weit hinten entdeckst du einen Karton. Als du ihn hervorholst, hörst du ein Kratzen.",
                image: "img/19.jpeg",
                options: [
                    {
                        optionText: "Du öffnest die Kiste. Was soll schiefgehen?",
                        nextScene: 20,
                        showThisOption: () => true,
                    },
                    {
                        optionText: "Du nimmst lieber alte Mäuse aus der Krusch-Kiste mit.",
                        nextScene: 26,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 20,
                sceneDescription: "Du traust deinen Augen kaum. In der Kiste sitzt ein grantiger Gnom. Er will von dir einen Keks. Ansonsten würdest du es bereuen.",
                image: "img/20.jpeg",
                options: [
                    {
                        optionText: "Einen Keks? Wir sind hier nicht bei Wünsch-dir-was!",
                        nextScene: 21,
                        showThisOption: () => true,
                    },
                    {
                        optionText: "Du bietest statt des Kekses einen Lebkuchen an.",
                        nextScene: 22,
                        showThisOption: () => inventory.lebkuchen,
                    },
                    {
                        optionText: "Warum nur hast du den Lebkuchen gegessen? Stattdessen bietest du eine Fußmassage an.",
                        nextScene: 23,
                        showThisOption: () => !inventory.lebkuchen,
                    },
                ]
            }, 
            {
                id: 21,
                sceneDescription: "Der Gnom trommelt mit seinen Fäusten auf seinen Bauch. Kurz bebt die Erde. Erschrocken läufst du zum Baum. Hättest du ihn nur stabilisiert. Jetzt liegt er kaputt am Boden.",
                image: "img/21.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 22,
                sceneDescription: "Der Gnom grunzt und folgt dir ins Büro. Er verputzt den ganzen Lebkuchen. Gemäß Gnom-Ehrenkodex darfst du nun eine Gegenleistung wählen.",
                image: "img/22.jpeg",
                options: [
                    {
                        optionText: "Du wünschst dir den Rest des Tages frei.",
                        nextScene: 24,
                        showThisOption: () => true,
                    },
                    {
                        optionText: "Du wünschst dir einen perfekt geschmückten Baum.",
                        nextScene: 25,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 24,
                sceneDescription: "Eine Rundmail von P&B kommt. Die Heizung ist kaputt. Alle dürfen für heute nach Hause. Gemeinsam mit deinem Team gehst du auf den Weihnachtsmarkt - hier gibt es auch tolle Bäume!",
                image: "img/24.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 25,
                sceneDescription: "Der Gnom schnipst und schon sieht der Baum toll aus. In Rot und Silber gehüllt. Mit Kugeln, Schleifen und Lichtern. Weihnachten kann kommen!",
                image: "img/25.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 23,
                sceneDescription: "Der Gnom willigt ein. Leider ist er extrem kitzelig an den Füßen. Lachend schießt er wie ein Flummi durch das Büro. Der Baum wird getroffen, knickt ab und fällt zu Boden. Ohje…",
                image: "img/23.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 26,
                sceneDescription: "Du hängst die Mäuse an den Baum. Zugegeben, das sieht trist aus. Da musst du noch etwas Gas geben.",
                image: "img/26.jpeg",
                options: [
                    {
                        optionText: "Du plünderst das restliche IT-Lager.",
                        nextScene: 27,
                        showThisOption: () => true,
                    },
                    {
                        optionText: "Du suchst weiter nach echtem Baumschmuck.",
                        nextScene: 30,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 27,
                sceneDescription: "Jetzt glitzern noch kleine USB-Sticks in den Zweigen und die Keys alter Tastaturen verkünden der Welt: „MERRY XMAS“.",
                image: "img/27.jpeg",
                options: [
                    {
                        optionText: "Du verwendest eine alte Festplatte als Baumspitze.",
                        nextScene: 28,
                        showThisOption: () => true,
                    },
                    {
                        optionText: "Du schneidest ein paar Sterne aus Post-Ist aus.",
                        nextScene: 29,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 28,
                sceneDescription: "Du montierst die Festplatte als Baumspitze. Leider hast du vergessen, dass der Baum schon zu Beginn sehr wackelig und schief war. Es kommt, wie es muss: Die Festplatte ist zu schwer. Der Baum bricht und fällt wie ein Sack.",
                image: "img/28.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 29,
                sceneDescription: "Auch wenn die Sterne nicht leuchten, geben sie deinem individuellen Baumschmuck ein schönes Finish. Das Fest kann beginnen.",
                image: "img/29.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },

                ]
            }, 
            {
                id: 30,
                sceneDescription: "Vergeblich. Stattdessen pickst du wie eine Elster kleine Dinge zusammen. Bonbons, Haarspangen, Schlüsselanhänger. Leider bleibt das nicht unbemerkt. Knallend erscheint ein Elf, der dich tadelnd anblickt.",
                image: "img/30.jpeg",
                options: [
                    {
                        optionText: "Bestechung hilft. Du bietest ihm die Hälfte der Beute.",
                        nextScene: 31,
                        showThisOption: () => true,
                    },
                    {
                        optionText: "Du erklärst deine Lage und hoffst auf Verständnis.",
                        nextScene: 32,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 31,
                sceneDescription: "Offenbar bist du an einen korrupten Elfen gelangt. Er wird dich nicht verpetzen. Im Gegenteil. Schnell schnappt er sich alle Sachen und verschwindet. Unter der Beute ist auch der Autoschlüssel des Chefs. Du schluckst. Statt zu schmücken gehst du beichten.",
                image: "img/31.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
            {
                id: 32,
                sceneDescription: "Der Elf nickt. Er ist da, um dir zu helfen. Schnell dreht er sich dreimal um sich selbst und siehe da: der Baum ist knallbunt geschmückt. Mit Zuckerstangen, Bonbons und Leckereien.",
                image: "img/32.jpeg",
                options: [
                    {
                        optionText: "Du bietest dem Elfen als Dank einen Lebkuchen an.",
                        nextScene: 33,
                        showThisOption: () => inventory.lebkuchen,
                    },
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => !inventory.lebkuchen,
                    },
                ]
            }, 
            {
                id: 33,
                sceneDescription: "Der Elf freut sich. Sowas erlebt er selten. Er schnipst und reicht dir einen tollen Weihnachtspulli, damit du passend zum Baum gekleidet bist.",
                image: "img/33.jpeg",
                options: [
                    {
                        optionText: "",
                        nextScene: 0,
                        showThisOption: () => true,
                    },
                ]
            }, 
        ]
    }        





    
  
})