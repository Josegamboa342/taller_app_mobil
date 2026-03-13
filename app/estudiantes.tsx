import { View, Text, TextInput, Pressable, FlatList, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { db } from "./database";
import { styles } from "./styles";

export default function Estudiantes() {

  const router = useRouter();
  const [cod, setCod] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [programa, setPrograma] = useState("");
  const [lista, setLista] = useState<any[]>([]);
  const [seleccionado, setSeleccionado] = useState<string | null>(null);

  useEffect(() => { cargar(); }, []);

  function seleccionar(item: any) {
    setCod(item.cod);
    setNombre(item.nombre);
    setEmail(item.email);
    setPrograma(item.programa_cod);
    setSeleccionado(item.cod);
  }

  function limpiar() {
    setCod(""); setNombre(""); setEmail(""); setPrograma("");
    setSeleccionado(null);
  }

  async function crear() {
    if (!cod || !nombre || !email || !programa) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }
    const prog: any = await db.getFirstAsync("SELECT cod FROM programas WHERE cod = ?", programa);
    if (!prog) {
      Alert.alert("Error", "El código de programa no existe");
      return;
    }
    try {
      await db.runAsync(
        `INSERT INTO estudiantes (cod, nombre, email, programa_cod) VALUES (?, ?, ?, ?)`,
        cod, nombre, email, programa
      );
      limpiar();
      cargar();
    } catch {
      Alert.alert("Error", "El código de estudiante ya existe");
    }
  }

  async function modificar() {
    if (!seleccionado) {
      Alert.alert("Aviso", "Toca un estudiante de la lista para seleccionarlo");
      return;
    }
    if (!nombre || !email) {
      Alert.alert("Error", "Nombre y email son obligatorios");
      return;
    }
    await db.runAsync(
      `UPDATE estudiantes SET nombre = ?, email = ? WHERE cod = ?`,
      nombre, email, seleccionado
    );
    limpiar();
    cargar();
  }

  async function eliminar() {
    if (!seleccionado) {
      Alert.alert("Aviso", "Toca un estudiante de la lista para seleccionarlo");
      return;
    }
    Alert.alert("Confirmar", `¿Eliminar a "${nombre}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar", style: "destructive",
        onPress: async () => {
          await db.runAsync("DELETE FROM estudiantes WHERE cod = ?", seleccionado);
          limpiar();
          cargar();
        }
      }
    ]);
  }

  async function cargar() {
    const datos = await db.getAllAsync(`
      SELECT e.*, p.nombre as programa_nombre
      FROM estudiantes e
      LEFT JOIN programas p ON e.programa_cod = p.cod
    `);
    setLista(datos as any[]);
  }

  return (
    <View style={styles.container}>

      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>← Volver</Text>
      </Pressable>

      <Text style={styles.title}>Estudiantes</Text>

      {seleccionado && (
        <Text style={styles.seleccionadoText}>
          ✅ Seleccionado: {seleccionado}
        </Text>
      )}

      <TextInput
        style={[styles.input, seleccionado ? styles.inputDeshabilitado : {}]}
        placeholder="Código (4 caracteres)"
        value={cod}
        onChangeText={setCod}
        maxLength={4}
        editable={!seleccionado}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        maxLength={90}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        maxLength={100}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, seleccionado ? styles.inputDeshabilitado : {}]}
        placeholder="Código de Programa"
        value={programa}
        onChangeText={setPrograma}
        maxLength={4}
        editable={!seleccionado}
      />

      {seleccionado && (
        <Text style={styles.hint}>ℹ️ Al modificar solo se cambia nombre y email</Text>
      )}

      <View style={styles.fila}>
        <Pressable style={[styles.button, styles.btnCrear]} onPress={crear}>
          <Text style={styles.buttonText}>Crear</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.btnModificar]} onPress={modificar}>
          <Text style={styles.buttonText}>Modificar</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.btnEliminar]} onPress={eliminar}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.btnLimpiar]} onPress={limpiar}>
          <Text style={styles.buttonText}>Limpiar</Text>
        </Pressable>
      </View>

      <Text style={styles.hint}>👆 Toca un estudiante para seleccionarlo</Text>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.cod}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => seleccionar(item)}
            style={[styles.item, seleccionado === item.cod && styles.itemSeleccionado]}
          >
            <Text style={styles.itemCod}>{item.cod} — {item.nombre}</Text>
            <Text style={styles.itemNombre}>📧 {item.email}</Text>
            <Text style={styles.itemPrograma}>🎓 {item.programa_nombre ?? item.programa_cod}</Text>
          </Pressable>
        )}
      />

    </View>
  );
}