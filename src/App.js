import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, ActivityIndicator, Animated, KeyboardAvoidingView, Platform } from 'react-native';

const App = () => {
  const [useCase, setUseCase] = React.useState('');
  const [schedule, setSchedule] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [inputVisible, setInputVisible] = React.useState(true);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  const handleRun = async () => {
    if (!useCase.trim()) return;
    
    setLoading(true);
    
    // Fast testing mode with "t"
    if (useCase.trim().toLowerCase() === 't') {
      setTimeout(() => {
        setSchedule([
          {
            date: '2025-11-28',
            actions: [
              { 
                time: '09:00', 
                content: 'Morning workout routine - "POV: When you actually show up" hook with trending sound',
                strategy: 'Morning posts (7-10am) catch early scrollers with high engagement intent. Relatable POV format maximizes initial reach.',
                algorithmTriggers: ['high completion rate', 'trending sound', 'peak morning engagement']
              },
              { 
                time: '19:00', 
                content: 'Transformation showcase - "Nobody believed this would work" before/after story',
                strategy: 'Prime time (7-9pm) peak traffic. Transformation content triggers saves and profile visits.',
                algorithmTriggers: ['save intent', 'emotional engagement', 'peak evening traffic']
              }
            ]
          },
          {
            date: '2025-11-29',
            actions: [
              { 
                time: '12:30', 
                content: 'Common mistake tutorial - "Stop doing [X], here\'s why" with quick cuts',
                strategy: 'Lunch hour engagement window. Educational content gets high saves and shares.',
                algorithmTriggers: ['save intent', 'share potential', 'educational value']
              }
            ]
          },
          {
            date: '2025-11-30',
            actions: [
              { 
                time: '08:00', 
                content: 'Behind-the-scenes process - "How I actually [result]" authentic footage',
                strategy: 'Early engagement captures morning audience. BTS builds niche authority.',
                algorithmTriggers: ['niche authority', 'authenticity', 'watch time optimization']
              },
              { 
                time: '20:00', 
                content: 'Community Q&A response - Address top comment from previous post',
                strategy: 'Peak evening slot. Community engagement drives comments and repeat viewers.',
                algorithmTriggers: ['engagement velocity', 'community building', 'comment bait']
              }
            ]
          },
          {
            date: '2025-12-01',
            actions: [
              { 
                time: '10:00', 
                content: 'Weekend lifestyle content - Relatable situation with humor hook',
                strategy: 'Weekend morning casual browsing peak. Lifestyle content performs well on Sundays.',
                algorithmTriggers: ['relatable content', 'weekend engagement', 'share potential']
              }
            ]
          },
          {
            date: '2025-12-02',
            actions: [
              { 
                time: '13:00', 
                content: 'Product/service showcase - "You need to see this" demo format',
                strategy: 'Monday afternoon reengagement. Demo content drives profile visits and external clicks.',
                algorithmTriggers: ['demonstration value', 'profile visit trigger', 'conversion intent']
              },
              { 
                time: '18:30', 
                content: 'Duet trending creator - Add value to viral video in your niche',
                strategy: 'Evening duet capitalizes on viral momentum. Duets multiply discoverability.',
                algorithmTriggers: ['duet discoverability', 'viral piggyback', 'cross-audience exposure']
              }
            ]
          },
          {
            date: '2025-12-05',
            actions: [
              { 
                time: '11:00', 
                content: 'Tips compilation - "5 things I wish I knew" quick-fire format',
                strategy: 'Mid-morning engagement. List format increases completion rate and saves.',
                algorithmTriggers: ['high completion rate', 'save intent', 'listicle format']
              }
            ]
          },
          {
            date: '2025-12-07',
            actions: [
              { 
                time: '15:00', 
                content: 'Story time with lesson - Hook: "This changed everything for me"',
                strategy: 'Saturday afternoon browsing peak. Story format maximizes watch time.',
                algorithmTriggers: ['watch time optimization', 'emotional connection', 'weekend traffic']
              }
            ]
          }
        ]);
        hideInputSection();
        setLoading(false);
      }, 800);
      return;
    }
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are an expert TikTok social media strategist with deep knowledge of the TikTok algorithm and viral mechanics.

CRITICAL ALGORITHM KNOWLEDGE:
- TikTok prioritizes watch time (completion rate is king - videos watched to the end get massive boosts)
- First 3 seconds determine if users continue watching (hook is everything)
- Engagement velocity matters: early likes/comments/shares in first hour boost distribution
- Consistency is rewarded: posting at optimal times when YOUR audience is active
- Algorithm favors niche content that keeps users on platform longer
- Trending sounds/hashtags give initial boost but content quality sustains it
- Re-engagement triggers: saves, shares, and profile visits are highest value signals
- Duets and stitches increase discoverability exponentially
- Average watch time across all videos affects account-level distribution
- Peak posting times: 6-10am, 12-2pm, 7-11pm (but varies by niche)

POSTING STRATEGY RULES:
1. Never post more than 4 times daily (avoid spam penalties)
2. Maintain 4-6 hour gaps between posts for maximum reach per video
3. Best times vary: Lifestyle (7-9am, 7-9pm), Business (12-2pm), Entertainment (7-11pm)
4. Test different times, track what works for YOUR audience
5. Weekend engagement often higher for B2C, weekdays for B2B

OUTPUT FORMAT (CRITICAL - FOLLOW EXACTLY):
Return ONLY a valid JSON array, no markdown, no code blocks, no extra text. Structure:
[
  {
    "date": "YYYY-MM-DD",
    "actions": [
      {
        "time": "HH:MM",
        "content": "Specific post description with hook strategy",
        "strategy": "Algorithm-based explanation: why this time, content type, and approach",
        "algorithmTriggers": ["trigger1", "trigger2", "trigger3"]
      }
    ]
  }
]

For each post include:
- content: What to post (include hook, content format, trending element usage)
- strategy: WHY this works (algorithm mechanics, timing rationale, engagement triggers)
- algorithmTriggers: Array of specific triggers being leveraged (e.g., "high completion rate", "trending sound", "engagement velocity", "save intent", "niche authority")

Base recommendations on user's specific niche, target audience, and goals. Optimize posting times for their use case.`
            },
            {
              role: 'user',
              content: useCase
            }
          ],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content.trim();
      
      // Remove markdown code blocks if present
      const jsonContent = content.replace(/```json\n?|\n?```/g, '').trim();
      const scheduleData = JSON.parse(jsonContent);
      
      setSchedule(scheduleData);
      hideInputSection();
    } catch (error) {
      console.error('Error:', error);
      // Mock data for development/testing
      setSchedule([
        {
          date: '2025-11-28',
          actions: [
            { 
              time: '09:00', 
              content: 'Morning workout routine - Start with dramatic "POV: When you actually wake up for the gym" hook with trending sound',
              strategy: 'Morning posts (7-10am) catch early scrollers with high engagement intent. Relatable POV format + trending audio maximizes initial reach. Workout content has high completion rates when under 15 seconds.',
              algorithmTriggers: ['high completion rate', 'trending sound', 'peak morning engagement', 'relatable content']
            },
            { 
              time: '19:00', 
              content: 'Transformation results showcase - Hook: "Nobody believed this would work" showing before/after with emotional storytelling',
              strategy: 'Prime time posting (7-9pm) when TikTok traffic peaks. Transformation content triggers saves (high-value signal) and profile visits. Emotional storytelling increases average watch time.',
              algorithmTriggers: ['save intent', 'emotional engagement', 'peak evening traffic', 'profile visit trigger']
            }
          ]
        },
        {
          date: '2025-11-29',
          actions: [
            { 
              time: '12:30', 
              content: 'Common mistake educational video - Hook: "Stop doing [X], here\'s why" with quick-cut editing',
              strategy: 'Lunch hour catch (12-2pm) for engaged scrolling. Educational content gets high saves and shares. "Stop doing X" format creates pattern interrupt for strong hook.',
              algorithmTriggers: ['save intent', 'share potential', 'educational value', 'pattern interrupt hook']
            },
            { 
              time: '20:00', 
              content: 'Behind-the-scenes process video - "How I actually [achieve result]" with authentic footage',
              strategy: 'Peak engagement window. BTS content builds niche authority and increases average watch time. Authenticity drives comments (engagement velocity boost).',
              algorithmTriggers: ['niche authority', 'comment bait', 'engagement velocity', 'watch time optimization']
            }
          ]
        },
        {
          date: '2025-11-30',
          actions: [
            { 
              time: '08:00', 
              content: 'Duet opportunity with trending creator - React/add value to viral video in your niche',
              strategy: 'Early morning duet capitalizes on overnight viral videos. Duets increase discoverability exponentially and tap into established audiences.',
              algorithmTriggers: ['duet discoverability', 'viral piggyback', 'cross-audience exposure', 'trending participation']
            }
          ]
        }
      ]);
      hideInputSection();
    } finally {
      setLoading(false);
    }
  };

  const hideInputSection = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setInputVisible(false);
    });
  };

  const showInputSection = () => {
    setInputVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleNewRequest = () => {
    setSchedule([]);
    setUseCase('');
    showInputSection();
  };

  const openDayModal = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      monthLong: date.toLocaleString('default', { month: 'long' }),
      year: date.getFullYear(),
      weekday: date.toLocaleString('default', { weekday: 'short' }),
      dayOfWeek: date.getDay()
    };
  };

  const getMonthTitle = (schedule) => {
    if (schedule.length === 0) return '';
    const firstDate = new Date(schedule[0].date);
    return firstDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const generateCalendarGrid = (schedule) => {
    if (schedule.length === 0) return [];
    
    // Get first date's month and year
    const firstDate = new Date(schedule[0].date);
    const month = firstDate.getMonth();
    const year = firstDate.getFullYear();
    
    // Get first day of month (0 = Sunday, 6 = Saturday)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Get number of days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Create a map of dates to schedule data
    const scheduleMap = {};
    schedule.forEach(day => {
      const date = new Date(day.date);
      if (date.getMonth() === month && date.getFullYear() === year) {
        scheduleMap[date.getDate()] = day;
      }
    });
    
    const grid = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      grid.push({ isEmpty: true });
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayData = scheduleMap[day];
      grid.push({
        isEmpty: false,
        dayNumber: day,
        postCount: dayData ? dayData.actions.length : 0,
        isHighlighted: !!dayData,
        data: dayData
      });
    }
    
    return grid;
  };

  return (
    <KeyboardAvoidingView 
      style={styles.containerNoScroll}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
        {schedule.length > 0 && !inputVisible && (
          <TouchableOpacity
            style={styles.newRequestButton}
            onPress={handleNewRequest}
            activeOpacity={0.8}
          >
            <Text style={styles.newRequestText}>+ New Request</Text>
          </TouchableOpacity>
        )}

        {inputVisible && (
          <Animated.View 
            style={[
              styles.inputSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.title}>ni posting schedule</Text>
            <Text style={styles.subtitle}>Optimize your content with AI my ni</Text>
            
            <Text style={styles.label}>Tell me what you need, son</Text>
            <TextInput
              style={styles.input}
              value={useCase}
              onChangeText={setUseCase}
              placeholder="e.g., I need a weekly posting schedule for a fitness brand targeting Gen Z niglets..."
              placeholderTextColor="#6b5a9e"
              multiline
              numberOfLines={4}
            />
            
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleRun}
              activeOpacity={0.8}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Generate Schedule</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        )}

        {schedule.length > 0 && (
          <View style={styles.scheduleSection}>
            <Text style={styles.scheduleTitle}>Your hog rider Schedule</Text>
            <Text style={styles.monthTitle}>{getMonthTitle(schedule)}</Text>
            <View style={styles.weekdayHeader}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                <Text key={idx} style={styles.weekdayLabel}>{day}</Text>
              ))}
            </View>
            <View style={styles.calendarGrid}>
              {generateCalendarGrid(schedule).map((day, index) => (
                day.isEmpty ? (
                  <View key={index} style={styles.emptyDayCard} />
                ) : (
                  <TouchableOpacity
                    key={index}
                    style={[styles.dayCard, day.isHighlighted && styles.dayCardHighlighted]}
                    onPress={() => day.data && openDayModal(day.data)}
                    activeOpacity={day.postCount > 0 ? 0.7 : 1}
                    disabled={day.postCount === 0}
                  >
                    <Text style={styles.dayNumber}>{day.dayNumber}</Text>
                    {day.postCount > 0 && (
                      <View style={styles.postCountContainer}>
                        <Text style={styles.postCount}>{day.postCount} </Text>
                        <Text style={styles.postLabel}>post{day.postCount !== 1 ? 's' : ''}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )
              ))}
            </View>
          </View>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedDay && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                      {formatDate(selectedDay.date).weekday}, {formatDate(selectedDay.date).month} {formatDate(selectedDay.date).day}
                    </Text>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <ScrollView style={styles.modalScroll}>
                    {selectedDay.actions.map((action, idx) => (
                      <View key={idx} style={styles.actionItem}>
                        <View style={styles.actionHeader}>
                          <View style={styles.timeBadge}>
                            <Text style={styles.timeText}>{action.time}</Text>
                          </View>
                        </View>
                        
                        <Text style={styles.actionContent}>{action.content}</Text>
                        
                        {action.strategy && (
                          <View style={styles.strategySection}>
                            <Text style={styles.strategySectionTitle}>📊 Algorithm Strategy</Text>
                            <Text style={styles.strategyText}>{action.strategy}</Text>
                          </View>
                        )}
                        
                        {action.algorithmTriggers && action.algorithmTriggers.length > 0 && (
                          <View style={styles.triggersSection}>
                            <Text style={styles.triggersSectionTitle}>🎯 Targeting</Text>
                            <View style={styles.triggersContainer}>
                              {action.algorithmTriggers.map((trigger, triggerIdx) => (
                                <View key={triggerIdx} style={styles.triggerTag}>
                                  <Text style={styles.triggerText}>{trigger}</Text>
                                </View>
                              ))}
                            </View>
                          </View>
                        )}
                      </View>
                    ))}
                  </ScrollView>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerNoScroll: {
    flex: 1,
    backgroundColor: '#0f0a1f',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#0f0a1f',
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#0f0a1f',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    padding: 16,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: 'center',
    backgroundColor: '#0f0a1f',
  },
  newRequestButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 24,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  newRequestText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  inputSection: {
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#e8e3ff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9b8dd9',
    marginBottom: 32,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e8e3ff',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#1a1333',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#e8e3ff',
    borderWidth: 1,
    borderColor: '#3d2d6b',
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 16,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  scheduleSection: {
    marginTop: 40,
  },
  scheduleTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e8e3ff',
    marginBottom: 8,
  },
  monthTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#8b5cf6',
    marginBottom: 16,
    textAlign: 'center',
  },
  weekdayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  weekdayLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#9b8dd9',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayCard: {
    width: 'calc(14.28% - 7px)',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3d2d6b',
    backgroundColor: 'transparent',
    padding: 8,
    justifyContent: 'space-between',
  },
  dayCardHighlighted: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderColor: '#8b5cf6',
  },
  emptyDayCard: {
    width: 'calc(14.28% - 7px)',
    aspectRatio: 1,
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e8e3ff',
    alignSelf: 'flex-end',
  },
  postCountContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  postCount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8b5cf6',
  },
  postLabel: {
    fontSize: 10,
    color: '#6b5a9e',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1333',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#3d2d6b',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3d2d6b',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#e8e3ff',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3d2d6b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#e8e3ff',
    fontWeight: '600',
  },
  modalScroll: {
    padding: 20,
  },
  actionItem: {
    backgroundColor: '#0f0a1f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3d2d6b',
  },
  actionHeader: {
    marginBottom: 12,
  },
  timeBadge: {
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  actionContent: {
    fontSize: 16,
    color: '#e8e3ff',
    lineHeight: 24,
    marginBottom: 12,
  },
  strategySection: {
    backgroundColor: '#1a1333',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#8b5cf6',
  },
  strategySectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9b8dd9',
    marginBottom: 6,
  },
  strategyText: {
    fontSize: 14,
    color: '#c4b5fd',
    lineHeight: 20,
  },
  triggersSection: {
    marginTop: 12,
  },
  triggersSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9b8dd9',
    marginBottom: 8,
  },
  triggersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  triggerTag: {
    backgroundColor: '#2d1f4a',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#8b5cf6',
  },
  triggerText: {
    fontSize: 12,
    color: '#c4b5fd',
    fontWeight: '500',
  },
});

export default App;
