
export class Sentence {
    _sentences: string;
    _sentence: Array<any>;
    _id: string;
    _similarity: number;
    _originalSentence:string
    constructor(_sentences: string, _sentence: Array<any>, _id:string,_similarity:number,_originalSentence:string) {
      this._sentences = _sentences;
      this._sentence = _sentence;
      this._id = _id;
      this._similarity = _similarity;
      this._originalSentence = _originalSentence;
  }
  }
  