import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import DiaryCard from "../../src/components/DiaryCard";
import { toggleFavorite } from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

const MOOD_FILTERS = ["ALL", "😊", "🚀", "📚", "😌"] as const;

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [selectedMood, setSelectedMood] = useState<string>("ALL");

  const entries = useAppSelector((state) => state.diary.entries);
  const totalDiary = useAppSelector((state) => state.diary.entries.length);
  const totalFavorite = useAppSelector(
    (state) => state.diary.entries.filter((item) => item.liked).length
  );

  const filteredEntries =
    selectedMood === "ALL"
      ? entries
      : entries.filter((item) => item.mood === selectedMood);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      {/* Statistik Total Diary & Total Favorite */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalDiary}</Text>
          <Text style={styles.statLabel}>Total Diary</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalFavorite}</Text>
          <Text style={styles.statLabel}>Total Favorite</Text>
        </View>
      </View>

      {/* Filter Mood */}
      <View style={styles.filterRow}>
        {MOOD_FILTERS.map((mood) => {
          const active = selectedMood === mood;
          return (
            <Pressable
              key={mood}
              onPress={() => setSelectedMood(mood)}
              style={[styles.filterChip, active && styles.filterChipActive]}
            >
              <Text
                style={[styles.filterText, active && styles.filterTextActive]}
              >
                {mood === "ALL" ? "Semua" : mood}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.counter}>
        Menampilkan {filteredEntries.length} diary
      </Text>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={item.liked}
            onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
            onPress={() =>
              router.push({
                pathname: "/detail/[id]",
                params: { id: String(item.id) },
              })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Belum ada diary yang cocok</Text>
            <Text style={styles.emptyDesc}>
              {selectedMood === "ALL"
                ? "Tambahkan catatan harian pertamamu melalui tab Tambah."
                : `Tidak ada diary dengan mood ${selectedMood} saat ini.`}
            </Text>
            {selectedMood !== "ALL" && (
              <Pressable
                onPress={() => setSelectedMood("ALL")}
                style={styles.resetButton}
              >
                <Text style={styles.resetButtonText}>Tampilkan Semua</Text>
              </Pressable>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.s,
  },
  statsRow: {
    flexDirection: "row",
    gap: SPACE.m,
    marginBottom: SPACE.m,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.m,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginTop: 2,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACE.s,
    marginBottom: SPACE.m,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  filterChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  counter: {
    color: COLORS.muted,
    marginBottom: SPACE.m,
  },
  emptyBox: {
    alignItems: "center",
    padding: SPACE.xl,
    marginTop: SPACE.l,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACE.s,
  },
  emptyTitle: {
    fontSize: TYPO.title,
    fontWeight: "700",
    color: COLORS.text,
  },
  emptyDesc: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    textAlign: "center",
  },
  resetButton: {
    marginTop: SPACE.s,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});