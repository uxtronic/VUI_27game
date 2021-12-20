'use strict';
const Alexa = require('ask-sdk');
const Util = require('./util');
const aplMainTemplate = require('./apl-main.json');
/***********
Data: Customize the data below as you please.
***********/


const SKILL_NAME = "Wine for all";
const HELP_MESSAGE_BEFORE_START = "Answer all my questions, be honest, and don't worry the result is always good... it's wine anyway! Ready to play?";
const HELP_MESSAGE_AFTER_START = "Just answer with yes or no and I'll tell you what you should drink in the end.";
const HELP_REPROMPT = "Your wine type will be revealed after you answer all my questions.";
const STOP_MESSAGE = "Goodbye! And remember: Don't drink and drive!.";
const MISUNDERSTOOD_INSTRUCTIONS_ANSWER = "Please answer with yes or no.";
const HINT_TEXT = `To play again, just say "Alexa, open ${SKILL_NAME}"`


//const BACKGROUND_IMAGE_URL = "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/default.jpg";
const BACKGROUND_IMAGE_URL =  "results/WineForAll_picturesstart2.jpg";
//const BACKGROUND_GOODBYE_IMAGE_URL = "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/goodbye.jpg";
const BACKGROUND_GOODBYE_IMAGE_URL = "WineForAll_picturesfinal.jpg";
//const BACKGROUND_HELP_IMAGE_URL = "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/help.jpg";
const BACKGROUND_HELP_IMAGE_URL = "WineForAll_pictureshelp.jpg";

const WELCOME_MESSAGE = "Hi! Wine can tell a lot about us. Through a serie of 5 scientific proven questions, I'll tell you all you need to know about yourself. Are you ready to start?";
const INITIAL_QUESTION_INTROS = [
  "Great! Let's get started!",
  "<say-as interpret-as='interjection'>Alrighty</say-as>! Here comes your first question!",
  "Then, let's do this! <say-as interpret-as='interjection'>So..</say-as>",
  "<say-as interpret-as='interjection'>well...</say-as>."
];
const QUESTION_INTROS = [
  "Poor thing.",
  "You got this!",
  "Oh yeah!",
  "Sure...",
  "I would have said that too.",
  "Of course.",
  "I knew it.",
  "Me too."
];
const UNDECISIVE_RESPONSES = [
  "<say-as interpret-as='interjection'>Honk</say-as>. I'll take that as a yes!.",
  "<say-as interpret-as='interjection'>No worries</say-as>. I know what you did last summer.",
  "<say-as interpret-as='interjection'>Ups</say-as>... Alright don't tell.",
  "<say-as interpret-as='interjection'>Uh oh</say-as>... We'll just move on then.",
  "<say-as interpret-as='interjection'>Aw man</say-as>. How about this one?",
];
const RESULT_MESSAGE = "Here comes the truth!... You are "; // the name of the result is inserted here.
const RESULT_MESSAGE_SHORT = "You are "; // the name of the result is inserted here.
const PLAY_AGAIN_REQUEST = "<say-as interpret-as='interjection'>...That's all folks!</say-as> I know you want to play again, should we start over?";

const resultList = {
  result1: {
    name: "like red wine.",
    display_name: "Red Wine",
    audio_message: "Always leaves a stain behind!",
    description: "STRONG. You like to leave your mark. Considered by most as the King! Provoque strong feelings, people either love you or hate you.",
    img: {
      //largeImageUrl: "https://coach-courses-us.s3.amazonaws.com/public/courses/voice/Example%20images%20skill%203/Red-knobbed.starfish.1200.jpg"
      largeImageUrl: "results/WineForAll_picturesRed.jpg",
    }
  },
  result2: {
    name: "like white wine.",
    display_name: "White Wine",
    audio_message: "The clown in the table!",
    description: "LIGHTHEARTED. You are bright and always happy! Like the sun in people's life. Rarely someone hate's you, even those who don't like you much, can have a good time with you in the right moments.",
    img: {
      //largeImageUrl: "https://coach-courses-us.s3.amazonaws.com/public/courses/voice/Example%20images%20skill%203/Aceria_anthocoptes.1200.jpg"
      largeImageUrl: "results/WineForAll_picturesWhite.jpg",
    }
  },
  result3: {
    name: "like green wine.",
    display_name: "Green Wine",
    audio_message: "No one knows about you!",
    description: "RARE. You are a special being! Not everyone even knows that you exist, but those who do, always find something special about you. There are moments specially made for you to shine.",
    img: {
      largeImageUrl: "https://coach-courses-us.s3.amazonaws.com/public/courses/voice/Example%20images%20skill%203/Anodorhynchus_hyacinthinus.1200.jpg"
      //largeImageUrl: "result3.jpg",
    }
  },
  result4: {
    name: "like rosé wine.",
    display_name: "Rosé Wine",
    audio_message: "Unsuccessfully trying to please everybody!",
    description: "PLEASANT. You are a gentleman, trying to please everyone, wich is not an easy task. Not everyone understand you and can recognize your value. But that will never stop you! You know your worth and that is enough.",
    img: {
      //largeImageUrl: "https://coach-courses-us.s3.amazonaws.com/public/courses/voice/Example%20images%20skill%203/Male_goat.1200.jpg"
      largeImageUrl: "results/WineForAll_picturesRose.jpg",
    }
  },
  result5: {
    name: "like port wine.",
    display_name: "Port Wine",
    audio_message: "Only the time can save you!",
    description: "TIMELESS. There's no way not to like you! You are to be consumed with care and moderation, and you are always present in the most special occasions. Wise, Robust, Charming... everyday that pass, you get better and better.",
    img: {
      //largeImageUrl: "https://coach-courses-us.s3.amazonaws.com/public/courses/voice/Example%20images%20skill%203/Bufo_boreas.1200.jpg"
      largeImageUrl: "results/WineForAll_picturesPort.jpg",
    }
  }
};

const questions = [{
    question: "Are you married?",
    questionDisplay: "Are you married (without regrest)?",
    //background:  "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/q1.jpg", 
    background: "WineForAll_pictures1.jpg",
    points: {
      result1: Math.floor(Math.random() * 11),
      result2: Math.floor(Math.random() * 11),
      result3: Math.floor(Math.random() * 11),
      result4: Math.floor(Math.random() * 11),
      result5: Math.floor(Math.random() * 11)
    }
  },
  {
    question: "Do you prefer the beach over countryside?",
    questionDisplay: "Do you prefer the beach over countryside?",
    //background: "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/q2.jpg", 
    background: "WineForAll_pictures2.jpg",
    points: {
      result1: Math.floor(Math.random() * 11),
      result2: Math.floor(Math.random() * 11),
      result3: Math.floor(Math.random() * 11),
      result4: Math.floor(Math.random() * 11),
      result5: Math.floor(Math.random() * 11)
    }
  },
  {
    question: "Do you always use underwear?",
    questionDisplay: "Do you always use underwear? We don't really wanna know this one!",
    //background: "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/q3.jpg", 
    background: "WineForAll_pictures3.jpg",
    points: {
      result1: Math.floor(Math.random() * 11),
      result2: Math.floor(Math.random() * 11),
      result3: Math.floor(Math.random() * 11),
      result4: Math.floor(Math.random() * 11),
      result5: Math.floor(Math.random() * 11)
    }
  },
  {
    question: "Have you ever cheated on your partner?",
    questionDisplay: "Have you ever cheated on your partner? Don't ruin it now!",
    //background: "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/q4.jpg", 
    background: "WineForAll_pictures44.jpg",
    points: {
      result1: Math.floor(Math.random() * 11),
      result2: Math.floor(Math.random() * 11),
      result3: Math.floor(Math.random() * 11),
      result4: Math.floor(Math.random() * 11),
      result5: Math.floor(Math.random() * 11)
    }
  },
  {
    question: "Do you lie often, to a voice assistant device?",
    questionDisplay: "Do you lie often, to a voice assistant device?",
    //background: "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/q5.jpg", 
    background: "WineForAll_pictures5.jpg",
    points: {
      result1: Math.floor(Math.random() * 11),
      result2: Math.floor(Math.random() * 11),
      result3: Math.floor(Math.random() * 11),
      result4: Math.floor(Math.random() * 11),
      result5: Math.floor(Math.random() * 11)
    }
  }
];

/***********
Execution Code: Avoid editing the code below if you don't know JavaScript.
***********/

// Private methods (this is the actual code logic behind the app)



const newSessionHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    var isCurrentlyPlayingOrGettingResult = false;
    if (sessionAttributes.state) {
       isCurrentlyPlayingOrGettingResult = true;
    }


    return handlerInput.requestEnvelope.request.type === `LaunchRequest` || (!isCurrentlyPlayingOrGettingResult && request.type === 'IntentRequest' && (request.intent.name === 'AMAZON.YesIntent' || request.intent.name === 'AMAZON.NoIntent'));
  },
  handle(handlerInput) {

    console.log('--------------------------------------- New session')
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    if (handlerInput.requestEnvelope.request.type === `LaunchRequest`) {
      _initializeApp(sessionAttributes);
      return buildResponse(handlerInput, WELCOME_MESSAGE, WELCOME_MESSAGE, SKILL_NAME);
    }
    if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent') {

      sessionAttributes.state = states.QUIZMODE;

      const systemSpeak = _nextQuestionOrResult(handlerInput);
      return buildResponse(handlerInput, systemSpeak.prompt, systemSpeak.reprompt, SKILL_NAME, systemSpeak.background,systemSpeak.displayText);
    }
    if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NoIntent') {
      console.log('--------------------------------------- Exit session')
      const attributesManager = handlerInput.attributesManager;
      const sessionAttributes = attributesManager.getSessionAttributes();
      sessionAttributes.state = '';
      return buildResponse(handlerInput, STOP_MESSAGE, '', SKILL_NAME, BACKGROUND_GOODBYE_IMAGE_URL,STOP_MESSAGE);
    }
    if (request.type === 'IntentRequest' && request.intent.name === 'UndecisiveIntent') {
      const outputSpeech = MISUNDERSTOOD_INSTRUCTIONS_ANSWER;
      return buildResponse(handlerInput, outputSpeech, outputSpeech, SKILL_NAME, BACKGROUND_IMAGE_URL,"");
    }
  },
};

const nextQuestionIntent = (handlerInput, prependMessage) => {
  const attributesManager = handlerInput.attributesManager;
  const sessionAttributes = attributesManager.getSessionAttributes();
  sessionAttributes.questionProgress++;
  var currentQuestion = questions[sessionAttributes.questionProgress].question;
  return {
    prompt: `${prependMessage} ${_randomQuestionIntro(sessionAttributes)} ${currentQuestion}`,
    reprompt: HELP_MESSAGE_AFTER_START,
    displayText: questions[sessionAttributes.questionProgress].questionDisplay,
    background: questions[sessionAttributes.questionProgress].background
  };
}

const resultIntent = (handlerInput, prependMessage) => {
  const attributesManager = handlerInput.attributesManager;
  const sessionAttributes = attributesManager.getSessionAttributes();
  const resultPoints = sessionAttributes.resultPoints;
  const result = Object.keys(resultPoints).reduce((o, i) => resultPoints[o] > resultPoints[i] ? o : i);
  const resultMessage = `${prependMessage} ${RESULT_MESSAGE} ${resultList[result].name}. ${resultList[result].audio_message}. ${PLAY_AGAIN_REQUEST}`;
  return {
    prompt: resultMessage,
    reprompt: PLAY_AGAIN_REQUEST,
    displayText: `${RESULT_MESSAGE_SHORT} ${resultList[result].name}`,
    background: resultList[result].img.largeImageUrl
  }

  // this.emit(':askWithCard', resultMessage, PLAY_AGAIN_REQUEST, resultList[result].display_name, resultList[result].description, resultList[result].img);
  //                        ^speechOutput  ^repromptSpeech     ^cardTitle                       ^cardContent                    ^imageObj
}

const RepeatIntentHandler = {
  canHandle(handlerInput) {
   return Alexa.getRequestType(handlerInput.requestEnvelope) ===   'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
   },
handle(handlerInput) {
    // Get the session attributes.
    const sessionAttributes =   
    handlerInput.attributesManager.getSessionAttributes(); 
    console.log('Repeat');
    console.log(sessionAttributes.lastPrompt);
   return 	buildResponse (handlerInput, sessionAttributes.lastPrompt, sessionAttributes.lastReprompt, sessionAttributes.lastTitle, sessionAttributes.lastImage_url,  sessionAttributes.lastDisplayText, sessionAttributes.lastDisplay_type) 
  }
};
	
const _randomIndexOfArray = (array) => Math.floor(Math.random() * array.length);
const _randomOfArray = (array) => array[_randomIndexOfArray(array)];
const _adder = (a, b) => a + b;
const _subtracter = (a, b) => a - b;

// Handle user input and intents:

const states = {
  QUIZMODE: "_QUIZMODE",
  RESULTMODE: "_RESULTMODE"
}



const quizModeHandler = {
  canHandle(handlerInput) {

    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    var isCurrentlyPlaying = false;
    if (sessionAttributes.state && sessionAttributes.state === states.QUIZMODE) {
      isCurrentlyPlaying = true;
    }

    return isCurrentlyPlaying;
  },
  handle(handlerInput) {
    console.log('---------------------------------------Quiz Mode')
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    var prependMessage = '';
    if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NextIntent') {
      const systemSpeak = nextQuestionIntent(handlerInput, prependMessage);
      return buildResponse(handlerInput, systemSpeak.prompt, systemSpeak.reprompt, SKILL_NAME, systemSpeak.background,systemSpeak.displayText);
    }

    if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent') {
      _applyresultPoints(sessionAttributes, _adder);
      sessionAttributes.state = states.QUIZMODE;
      const systemSpeak = _nextQuestionOrResult(handlerInput);
      return buildResponse(handlerInput, systemSpeak.prompt, systemSpeak.reprompt, SKILL_NAME, systemSpeak.background,systemSpeak.displayText);
    }

    if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NoIntent') {
      _applyresultPoints(sessionAttributes, _subtracter);
      sessionAttributes.state = states.QUIZMODE;
      const systemSpeak = _nextQuestionOrResult(handlerInput);
      return buildResponse(handlerInput, systemSpeak.prompt, systemSpeak.reprompt, SKILL_NAME, systemSpeak.background,systemSpeak.displayText);
    }

    if (request.type === 'IntentRequest' && request.intent.name === 'UndecisiveIntent') {
      Math.round(Math.random()) ? _applyresultPoints(sessionAttributes, _adder) : _applyresultPoints(sessionAttributes, _subtracter);
      const systemSpeak = _nextQuestionOrResult(handlerInput, _randomOfArray(UNDECISIVE_RESPONSES));
      return buildResponse(handlerInput, systemSpeak.prompt, systemSpeak.reprompt, SKILL_NAME, systemSpeak.background,systemSpeak.displayText);
    }

  if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.RepeatIntent') {
        console.log('Repeat');
    	console.log(sessionAttributes.lastPrompt);
	   return 	buildResponse (handlerInput, sessionAttributes.lastPrompt, sessionAttributes.lastReprompt, sessionAttributes.lastTitle, sessionAttributes.lastImage_url,  sessionAttributes.lastDisplayText, sessionAttributes.lastDisplay_type) 
	}
    
  
  },
};

const resultModeHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    var isCurrentlyPlaying = false;
    if (sessionAttributes.state &&
      sessionAttributes.state === states.QUIZMODE) {
      isCurrentlyPlaying = true;
    }

    return !isCurrentlyPlaying && request.type === 'IntentRequest' && sessionAttributes.state === states.RESULTMODE;
  },
  handle(handlerInput) {
    console.log('--------------------------------------- Result mode')
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    
    if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent') {
      _initializeApp(sessionAttributes);
      sessionAttributes.state = states.QUIZMODE;
      const systemSpeak = _nextQuestionOrResult(handlerInput);
      return buildResponse(handlerInput, systemSpeak.prompt, systemSpeak.reprompt, SKILL_NAME, systemSpeak.background, systemSpeak.displayText);
    }
    if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NoIntent') {
      const attributesManager = handlerInput.attributesManager;
      const sessionAttributes = attributesManager.getSessionAttributes();
      sessionAttributes.state = '';
      return buildResponse(handlerInput, STOP_MESSAGE, '', SKILL_NAME, BACKGROUND_GOODBYE_IMAGE_URL,STOP_MESSAGE);
    
    }
    
  if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.RepeatIntent') {
        console.log('Repeat');
    	console.log(sessionAttributes.lastPrompt);
	   return 	buildResponse (handlerInput, sessionAttributes.lastPrompt, sessionAttributes.lastReprompt, sessionAttributes.lastTitle, sessionAttributes.lastImage_url,  sessionAttributes.lastDisplayText, sessionAttributes.lastDisplay_type) 
	}
    


  },
};


const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' ||
        request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    console.log('--------------------------------------- Exit session')
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    sessionAttributes.state = '';
    return buildResponse(handlerInput, STOP_MESSAGE, '', SKILL_NAME, BACKGROUND_GOODBYE_IMAGE_URL,STOP_MESSAGE);
    //------------------------------------------------
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    console.log('--------------------------------------- Help')
    const attributesManager = handlerInput.attributesManager;
    var speechOutput = '';
    const sessionAttributes = attributesManager.getSessionAttributes();
    if (sessionAttributes.state === states.QUIZMODE) {
       speechOutput = HELP_MESSAGE_AFTER_START;
    } else {
       speechOutput = HELP_MESSAGE_BEFORE_START;
    }
    const reprompt = HELP_REPROMPT;
    return buildResponse(handlerInput, speechOutput, reprompt, SKILL_NAME, BACKGROUND_HELP_IMAGE_URL);
  },
};
const UnhandledHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput) {
    console.log('---------------------------------------Unhandled')
    const outputSpeech = MISUNDERSTOOD_INSTRUCTIONS_ANSWER;
    return buildResponse(handlerInput, outputSpeech, outputSpeech, SKILL_NAME);
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    console.log("Inside SessionEndedRequestHandler");
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

// Skill brain

const _initializeApp = handler => {
  // Set the progress to -1 one in the beginning
  handler.questionProgress = -1;
  // Assign 0 points to each animal
  var initialPoints = {};
  Object.keys(resultList).forEach(result => initialPoints[result] = 0);
  handler.resultPoints = initialPoints;
};

const _nextQuestionOrResult = (handlerInput, prependMessage = '') => {
  const attributesManager = handlerInput.attributesManager;
  const sessionAttributes = attributesManager.getSessionAttributes();
  if (sessionAttributes.questionProgress >= (questions.length - 1)) {

    sessionAttributes.state = states.RESULTMODE;
    return resultIntent(handlerInput, prependMessage)


  } else {
    return nextQuestionIntent(handlerInput, prependMessage);
  }
};

const _applyresultPoints = (handler, calculate) => {
  const currentPoints = handler.resultPoints;
  const pointsToAdd = questions[handler.questionProgress].points;

  handler.resultPoints = Object.keys(currentPoints).reduce((newPoints, result) => {
    newPoints[result] = calculate(currentPoints[result], pointsToAdd[result]);
    return newPoints;
  }, currentPoints);
};

const _randomQuestionIntro = handler => {
  if (handler.questionProgress === 0) {
    // return random initial question intro if it's the first question:
    return _randomOfArray(INITIAL_QUESTION_INTROS);
  } else {
    // Assign all question intros to remainingQuestionIntros on the first execution:
    var remainingQuestionIntros = remainingQuestionIntros || QUESTION_INTROS;
    // randomQuestion will return 0 if the remainingQuestionIntros are empty:
    let randomQuestion = remainingQuestionIntros.splice(_randomIndexOfArray(remainingQuestionIntros), 1);
    // Remove random Question from rameining question intros and return the removed question. If the remainingQuestions are empty return the first question:
    return randomQuestion ? randomQuestion : QUESTION_INTROS[0];
  }
};

// Utilities


let buildResponse = (handlerInput, prompt, reprompt, title = SKILL_NAME, image_url = BACKGROUND_IMAGE_URL,  displayText = prompt.replace(/(<([^>]+)>)/gi, ""), display_type = "BodyTemplate7" ) => {
  console.log(title);
  	const sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
	sessionAttributes.lastPrompt = prompt;
	sessionAttributes.lastReprompt = reprompt;
	sessionAttributes.lastTitle = title;
	sessionAttributes.lastImage_url = image_url;
	sessionAttributes.lastDisplayText = displayText;
	sessionAttributes.lastDisplay_type = display_type;
  if (reprompt) {
    handlerInput.responseBuilder.reprompt(reprompt);
  } else {
    handlerInput.responseBuilder.withShouldEndSession(true);
  }
   var response ;
  if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
     response = getDisplay(handlerInput, title,  prompt, image_url, display_type).responseBuilder;
  } else {
     response = handlerInput.responseBuilder.speak(prompt)
            
  }
  return response.withSimpleCard(title, displayText).getResponse();
}
function supportsDisplay(handlerInput) {
  var hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display
  return hasDisplay;
}


function getDisplay(handlerInput, title, displayText, image_url, display_type){
	if (!image_url.includes('https://')) {
		image_url=Util.getS3PreSignedUrl("Media/"+image_url);
	}
	

	console.log("the display type is => " + display_type);
    console.log(image_url);
    var VISUAL_TOKEN = 'showthis';
            // Create Render Directive
            
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                datasources: {
                        "headlineTemplateData": {
                            "type": "object",
                            "objectId": "headlineSample",
                            "properties": {
                                "backgroundImage": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": image_url,
                                            "size": "large"
                                        }
                                    ]
                                },
                                "textContent": {
                                    "primaryText": {
                                        "type": "PlainText",
                                        "text": displayText.replace(/(<([^>]+)>)/gi, "")
                                    }
                                },

                                "hintText": HINT_TEXT,
                                "welcomeSpeechSSML": `<speak>${displayText}</speak>`
                            },
                            "transformers": [
                                {
                                    "inputPath": "welcomeSpeechSSML",
                                    "transformer": "ssmlToSpeech",
                                    "outputName": "welcomeSpeech"
                                }
                            ]
                        }
                    },
                token: VISUAL_TOKEN,
                document: aplMainTemplate
            });
            
	
	return handlerInput;
}

// Init

  const skillBuilder = Alexa.SkillBuilders.custom();
  exports.handler = skillBuilder
    .addRequestHandlers(
      SessionEndedRequestHandler, HelpIntentHandler, ExitHandler, newSessionHandler, quizModeHandler, resultModeHandler, RepeatIntentHandler,  UnhandledHandler
    )
    //.addErrorHandlers(ErrorHandler)
    .lambda();
