export const formatFileName = (id: number, address: string, ext: string): string => {
    const removeInvalidCharacters = address.replace(/[<>:"/\\|?*]/g, "").trim();
    return `${id} - ${removeInvalidCharacters}${ext}`;
};