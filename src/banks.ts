export interface BankInfo {
  name: string;
  swift: string | null;
}

// Source: NBS Prevodník SK (https://nbs.sk/platby/vseobecne-informacie/ciselniky-a-registre/prevodnik-sk/).
export const SLOVAK_BANKS: Record<string, BankInfo> = {
  '0200': {
    name: 'Všeobecná úverová banka, a.s.',
    swift: 'SUBASKBX'
  },
  '0720': {
    name: 'Národná banka Slovenska',
    swift: 'NBSBSKBX'
  },
  '0900': {
    name: 'Slovenská sporiteľňa, a.s.',
    swift: 'GIBASKBX'
  },
  '1100': {
    name: 'Tatra banka, a.s.',
    swift: 'TATRSKBX'
  },
  '1111': {
    name: 'UniCredit Bank Czech Republic and Slovakia, a.s., pobočka zahraničnej banky',
    swift: 'UNCRSKBX'
  },
  '3000': {
    name: 'Slovenská záručná a rozvojová banka, a.s.',
    swift: 'SLZBSKBA'
  },
  '3100': {
    name: 'Prima banka Slovensko, a.s.',
    swift: 'LUBASKBX'
  },
  '5600': {
    name: 'Prima banka Slovensko, a.s.',
    swift: 'KOMASK2X'
  },
  '5900': {
    name: 'Prvá stavebná sporiteľňa, a.s.',
    swift: 'PRVASKBA'
  },
  '6500': {
    name: '365.bank, a.s.',
    swift: 'POBNSKBA'
  },
  '7300': {
    name: 'ING Bank N.V., pobočka zahraničnej banky',
    swift: 'INGBSKBX'
  },
  '7500': {
    name: 'Československá obchodná banka, a.s.',
    swift: 'CEKOSKBX'
  },
  '7930': {
    name: 'Wüstenrot stavebná sporiteľňa, a.s.',
    swift: 'WUSTSKBA'
  },
  '8100': {
    name: 'Komerční banka, a.s., pobočka zahraničnej banky',
    swift: 'KOMBSKBA'
  },
  '8120': {
    name: 'Penta Bank, a.s.',
    swift: 'BSLOSK22'
  },
  '8130': {
    name: 'Citibank Europe plc, pobočka zahraničnej banky',
    swift: 'CITISKBA'
  },
  '8160': {
    name: 'EXIMBANKA SR',
    swift: 'EXSKSKBX'
  },
  '8180': {
    name: 'Štátna pokladnica',
    swift: 'SPSRSKBA'
  },
  '8191': {
    name: 'Centrálny depozitár cenných papierov SR, a.s.',
    swift: null
  },
  '8320': {
    name: 'J&T BANKA, a.s., pobočka zahraničnej banky',
    swift: 'JTBPSKBA'
  },
  '8330': {
    name: 'Fio banka, a.s., pobočka zahraničnej banky',
    swift: 'FIOZSKBA'
  },
  '8360': {
    name: 'mBank S.A., pobočka zahraničnej banky',
    swift: 'BREXSKBX'
  },
  '8370': {
    name: 'Oberbank AG pobočka zahraničnej banky v Slovenskej republike',
    swift: 'OBKLSKBA'
  },
  '8400': {
    name: 'COFIDIS SA, pobočka zahraničnej banky',
    swift: null
  },
  '8420': {
    name: 'BKS Bank AG, pobočka zahraničnej banky v SR',
    swift: 'BFKKSKBB'
  },
  '8450': {
    name: 'PKO BP S.A., pobočka zahraničnej banky',
    swift: 'BPKOSKBB'
  },
  '9950': {
    name: 'Nexi Central Europe, a.s.',
    swift: null
  },
  '9952': {
    name: 'Trust Pay, a.s.',
    swift: 'TPAYSKBX'
  },
  '9955': {
    name: 'Unifiedpost Payments, organizačná zložka',
    swift: 'PANXSK22'
  },
  '9956': {
    name: 'Payout a.s.',
    swift: null
  }
};
