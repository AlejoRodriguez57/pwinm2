export function mapAsesor(asesorSinMapear) {
    if (!asesorSinMapear) return null;

    const {
        whatsappLink,
        img,
        usuario = {}
    } = asesorSinMapear;

    return {
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono,
        whatsappLink,
        img,
    };
}