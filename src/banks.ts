export interface BankInfo {
  name: string;
  swift: string;
}

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
    name: 'UniCredit Bank Czech Republic and Slovakia, a.s.',
    swift: 'UNCRSKBX'
  },
  '3000': {
    name: 'Slovenská záručná a rozvojová banka, a.s.',
    swift: 'SLZBSKBA'
  },
  '3100': {
    name: 'Volksbank (Ľudová banka), a.s.',
    swift: 'LUBASKBX'
  },
  '5200': {
    name: 'OTP Banka Slovensko, a.s.',
    swift: 'OTPVSKBX'
  },
  '5600': {
    name: 'Prima banka Slovensko, a.s.',
    swift: 'KOMASK2X'
  },
  '5900': {
    name: '365.bank, a.s.',
    swift: 'POBNSKBA'
  },
  '6500': {
    name: 'Poštová banka, a.s.',
    swift: 'POBNSKBA'
  },
  '7300': {
    name: 'J&T Banka, a.s.',
    swift: 'JTBPSKBA'
  },
  '7500': {
    name: 'Československá obchodná banka, a.s.',
    swift: 'CEKOSKBX'
  },
  '8050': {
    name: 'Commerzbank AG',
    swift: 'COBASKBX'
  },
  '8100': {
    name: 'Komerční banka, a.s.',
    swift: 'KOMBSKBA'
  },
  '8120': {
    name: 'Privatbanka, a.s.',
    swift: 'BSLOSK22'
  },
  '8130': {
    name: 'BKS Bank AG',
    swift: 'BFKKSKBB'
  },
  '8170': {
    name: 'Fio banka, a.s.',
    swift: 'FIOZSKBA'
  },
  '8330': {
    name: 'Citibank Europe plc',
    swift: 'CITISKBA'
  },
  '8360': {
    name: 'mBank S.A.',
    swift: 'BREXSKBX'
  },
  '8370': {
    name: 'Oberbank AG',
    swift: 'OBKLSKBA'
  },
  '8410': {
    name: 'Exponential-e',
    swift: 'RIDBSKBX'
  },
  '8420': {
    name: 'ING Bank N.V.',
    swift: 'INGBSKBX'
  },
  '8430': {
    name: 'KDB Bank Europe Ltd.',
    swift: 'KODBSKBX'
  }
};
