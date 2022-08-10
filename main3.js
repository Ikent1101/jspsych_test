var git_site="https://ikent1101.github.io/jspsych_test/";
var timeline = [];


//const combi_sti=[
    //{cue:blue ,sti:left},
    //{cue:blue ,sti:right},
    //{cue:red ,sti:left},
    //{cue:red ,sti:right},
//]

const sti={
    cue:['blue','orange'],
    target:['left','right']
};

var combi_sti=jsPsych.randomization.factorial(sti,1);

const fixation = {
    type: 'html-keyboard-response',
    stimulus: '<p style="font-size: 48px">+</p>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 500,
};

//const creatcue = (combi_sti) => {
    //if (combi_sti.cue == blue) {
    //    var adovi = "青色";
    //} else {
    //    var adovi = "オレンジ色";
    //};
    const cues = {
        type: 'html-keyboard-response',
        stimulus:function()
        {
            if (jsPsych.timelineVariable('cue')=='blue'){
                var cuename="青色";
            }else{
                var cuename="オレンジ色";
            };
            var stimu='<p style="font-size: 40px">'+cuename+'</p>'+
                    '<img src="'+git_site+'img/' +jsPsych.timelineVariable('cue')+ '.png"></img>';
            return stimu;
            return cuename;
        },
        choices: jsPsych.NO_KEYS,
        trial_duration: 1000,
        on_finish: (data,cuename) => {
            data.cuecolor = cuename;
        },
    };
   // return cues;
//};

//const creattrl = (combi_sti) => {
    const trls = {
        type: 'html-keyboard-response',
        stimulus: function(){
            var tar_sti='<center><img src="'+git_site+'img/'+jsPsych.timelineVariable('target')+'.png" width="100%"></center>';
            return tar_sti;
        },
        choices: ['f', 'j'],
        post_trial_gap: 500,
        on_finish: (data) => {
            if (data.stimulus.includes('left')) {
                if (jsPsych.timelineVariable('cue') == 'blue') {
                    data.correctKey = 'f';
                } else {
                    data.correctKey = 'j';
                }
            } else {
                if (jsPsych.timelineVariable('cue') == 'blue') {
                    data.correctKey = 'j';
                } else {
                    data.correctKey = 'f';
                }
            }
            if (jsPsych.pluginAPI.compareKeys(data.response, data.correctKey)) {
                data.isCorrect = 1;
            } else {
                data.isCorrect = 0;
            }
        },
    };
   // return trls;
//}

//const createBlock = (img, trlchoi) => {
  //  const cues = creatcue(img);
   // const trls = creattrl(trlchoi, img);
    //const block = {
      //  timeline: [cues, fixation, trls],
    //};
    //return block;
//};

//const block1 = createBlock(blue, 'left');
//const block2 = createBlock(blue, 'right');
//const block3 = createBlock(red, 'left');
//const block4 = createBlock(red, 'right');

const purosdure={
    timeline:[cues,fixation,trls],
    timeline_variables: combi_sti,
    randomize_order: true,
    repetitions: 2,
}

timeline.push(purosdure);
