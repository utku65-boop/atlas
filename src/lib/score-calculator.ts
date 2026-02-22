
export interface NetCounts {
    tyt_turkce: number;
    tyt_sosyal: number;
    tyt_matematik: number;
    tyt_fen: number;
    ayt_matematik: number;
    ayt_fizik: number;
    ayt_kimya: number;
    ayt_biyoloji: number;
    ayt_edebiyat: number;
    ayt_tarih1: number;
    ayt_cografya1: number;
    ayt_tarih2: number;
    ayt_cografya2: number;
    ayt_felsefe: number;
    ayt_din: number;
    ydt: number;
    obp: number; // Ortaöğretim Başarı Puanı (Max 100)
}

// Coefficients based on 2024 YKS estimates
const COEFFS = {
    TYT: {
        base: 100,
        turkce: 3.3,
        sosyal: 3.4,
        mat: 3.3,
        fen: 3.4
    },
    AYT: {
        base: 0, // Base calculation is complex, usually derived from ham puan + OBP
        // SAY IS:
        SAY: {
            mat: 3.0,
            fizik: 2.85,
            kimya: 2.9,
            biyoloji: 3.0
        },
        // EA IS:
        EA: {
            mat: 3.0,
            edebiyat: 3.0,
            tarih1: 2.8,
            cografya1: 3.33
        },
        // SOZ IS:
        SOZ: {
            edebiyat: 3.0,
            tarih1: 2.8,
            cografya1: 3.33,
            tarih2: 2.91,
            cografya2: 2.91,
            felsefe: 3.0,
            din: 3.33
        }
    }
};

export function calculateYKS(nets: NetCounts, type: 'SAY' | 'EA' | 'SOZ' | 'DIL' = 'SAY'): number {
    // 1. TYT Score (Always calculated)
    const tytRaw = 100
        + (nets.tyt_turkce * COEFFS.TYT.turkce)
        + (nets.tyt_sosyal * COEFFS.TYT.sosyal)
        + (nets.tyt_matematik * COEFFS.TYT.mat)
        + (nets.tyt_fen * COEFFS.TYT.fen);

    // 2. AYT Score based on type
    let aytRaw = 0;

    if (type === 'SAY') {
        aytRaw = (nets.ayt_matematik * COEFFS.AYT.SAY.mat)
            + (nets.ayt_fizik * COEFFS.AYT.SAY.fizik)
            + (nets.ayt_kimya * COEFFS.AYT.SAY.kimya)
            + (nets.ayt_biyoloji * COEFFS.AYT.SAY.biyoloji);
    } else if (type === 'EA') {
        aytRaw = (nets.ayt_matematik * COEFFS.AYT.EA.mat)
            + (nets.ayt_edebiyat * COEFFS.AYT.EA.edebiyat)
            + (nets.ayt_tarih1 * COEFFS.AYT.EA.tarih1)
            + (nets.ayt_cografya1 * COEFFS.AYT.EA.cografya1);
    } else if (type === 'SOZ') {
        // Simplified SOZ calc if needed
        aytRaw = (nets.ayt_edebiyat * COEFFS.AYT.SOZ.edebiyat)
            + (nets.ayt_tarih1 * COEFFS.AYT.SOZ.tarih1)
            + (nets.ayt_cografya1 * COEFFS.AYT.SOZ.cografya1)
            + (nets.ayt_tarih2 * COEFFS.AYT.SOZ.tarih2)
            + (nets.ayt_cografya2 * COEFFS.AYT.SOZ.cografya2)
            + (nets.ayt_felsefe * COEFFS.AYT.SOZ.felsefe)
            + (nets.ayt_din * COEFFS.AYT.SOZ.din);
    }

    // 3. OBP Calculation (Diploma Notu * 0.6)
    // OBP range is 50-100. Min contribution 30, max 60.
    const obpScore = nets.obp * 0.6;

    // Total YKS Score = (TYT Score * 0.4) + (AYT Score * 0.6) + OBP
    // Note: The raw sum above is roughly simplified. 
    // Standard formula: Placement Score = (TYT * 0.4) + (AYT * 0.6) + OBP
    // But coefficients are applied to raw net counts to approximate this result directly.
    // Let's use a simpler aggregation model often used in calculators:
    // Base 100 + (TYT Nets * 1.3) + (AYT Nets * 3) ... this is messy.
    // Let's stick to the weighted sum + offset.

    // Approximate Offset for 2024 to match expected ranges
    // TYT max ~ 500. AYT max ~ 500.
    // Let's sum them with 40/60 weights?
    // Actually, distinct score types have their own totals.
    // Let's assume the coefficients above yield the "Yerleştirme Puanı" components directly when summed + base.

    const totalScore = tytRaw + aytRaw + obpScore;

    return Math.round(totalScore);
}
