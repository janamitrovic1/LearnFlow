
export const CheckQuiz = async(formData: FormData) => {
    try {
        let report: any = [];
        const quizid = formData.get("_id") + "";
        const res = await fetch(`/api/student/quiz/${quizid}/answer`, {
            credentials: 'include'
        });

        const { data } = await res.json();

        data?.questions?.map((question: any) => {
            if(question?.questionType == "RADIO") {
                const answer = formData.get(question?.id)
                const questionRep = { id: answer, text: question?.text, answer: formData.get(question?.id + "-text"), correct: false }
                if(question?.answers[0]?.responseId == answer)
                    questionRep.correct = true;
                report.push(questionRep);
            } else if(question?.questionType == "CHECK") {
                const answers = formData.getAll(question?.id);
                const questionRep:any = {text: question?.text, answers: []};
                answers?.map((answer: any, index: number) => {
                    const qr = { id:answer, answer: formData.get(question?.id + "-" + answer), correct: false };
                    question?.answers?.map((correctAnswer: any) => {
                        if(answer == correctAnswer?.responseId)
                            qr.correct = true;
                    })
                    questionRep.answers.push(qr)
                })
                report.push(questionRep);
            } else if(question?.questionType == "INPUT") {
                const answer = formData.get(question?.id);
                const questionRep = { id: question?.answers[0]?.responseId, text: question?.text, answer, correct: false }
                if(question?.responses[0]?.text == answer)
                    questionRep.correct = true;
                report.push(questionRep)
            }
        })
        
        return report;

    } catch (error) {
        console.log(error)
    }
}