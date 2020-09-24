/* global register */
register(function (question, customQuestionSettings, questionViewSettings) {
    var heatmap = new customQuestionsLibrary.Heatmap({
        question: question,
        areas: customQuestionSettings.areas,
        imageOptions: customQuestionSettings.imageOptions,
        answersCount: customQuestionSettings.answersCount,
        haveScales: customQuestionSettings.haveScales,
        scaleType: customQuestionSettings.scaleType,
        scales: customQuestionSettings.scales,
        styles: customQuestionSettings.styles
    });
});