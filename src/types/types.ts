export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'VIDEO' | 'EXCEL' | 'DOC' | 'IMAGE' | string;
  size: string;
  icon: JSX.Element;
  /** Main category */
  category?: ResourceCategory;
  /** Sub-subcategory for NATIONAL */
subSubCategory?: NationalSubCategory | null;
  /** Sub category */
  subCategory?: ResourceSubCategory;
  fileUrl: string;
}
export enum ResourceCategory {
  LEGAL = 'LEGAL',
  DATA = 'DATA',
  DIVERSE = 'DIVERSE',
  STUDIES = 'STUDIES',
}

export enum ResourceSubCategory {
  // LEGAL
  NATIONAL = 'NATIONAL',
  INTERNATIONAL = 'INTERNATIONAL',

  // DIVERSE
  CASE_LAW = 'CASE_LAW',
  OPINIONS = 'OPINIONS',
  OTHER = 'OTHER',
}
export enum NationalSubCategory {
  EMIRATES = 'EMIRATES',
  BAHRAIN = 'BAHRAIN',
  SAUDI_ARABIA = 'SAUDI_ARABIA',
  OMAN = 'OMAN',
  QATAR = 'QATAR',
  KUWAIT = 'KUWAIT',
}
